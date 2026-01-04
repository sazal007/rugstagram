import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addToWishlist, getWishlist, removeFromWishlist } from "@/services/wishlist";
import { ProductListItem } from "@/types/product";
import { toast } from "sonner";

export interface WishlistItemWithProduct {
    wishlistId: number;
    product: ProductListItem;
}

export const useWishlist = (accessToken?: string, enabled = true) => {
    return useQuery({
        queryKey: ["wishlist", accessToken],
        queryFn: () => getWishlist(accessToken),
        enabled: !!accessToken && enabled,
    });
}

export const useDetailedWishlist = (accessToken?: string) => {
    const { data: wishlistData } = useWishlist(accessToken);

    return useQuery({
        queryKey: ["wishlist-detailed", accessToken, wishlistData],
        queryFn: async (): Promise<WishlistItemWithProduct[]> => {
            if (!wishlistData || wishlistData.length === 0) return [];

            return wishlistData.map(item => ({
                wishlistId: item.id,
                product: item.product
            }));
        },
        enabled: !!accessToken && !!wishlistData,
    });
}

import { Wishlist } from "@/types/wishlist";

export const useAddToWishlist = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ({ productId, accessToken }: { productId: number; accessToken?: string }) => 
            addToWishlist(productId, accessToken),
        onMutate: async ({ productId, accessToken }) => {
            await queryClient.cancelQueries({ queryKey: ["wishlist", accessToken] });
            const previousWishlist = queryClient.getQueryData<Wishlist[]>(["wishlist", accessToken]);

            queryClient.setQueryData<Wishlist[]>(["wishlist", accessToken], (old) => {
                const newItem = {
                    id: Math.random(),
                    product: { id: productId } as unknown as ProductListItem,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                };
                return old ? [...old, newItem] : [newItem];
            });

            return { previousWishlist };
        },
        onSuccess: () => {
            toast.success("Added to wishlist");
        },
        onError: (err, variables, context) => {
            if (context?.previousWishlist) {
                queryClient.setQueryData(["wishlist", variables.accessToken], context.previousWishlist);
            }
            toast.error("Failed to add to wishlist");
        },
        onSettled: (data, error, variables) => {
            queryClient.invalidateQueries({ queryKey: ["wishlist", variables.accessToken] });
            queryClient.invalidateQueries({ queryKey: ["wishlist-detailed", variables.accessToken] });
            queryClient.invalidateQueries({ queryKey: ["products"] });
            queryClient.invalidateQueries({ queryKey: ["product"] });
        },
    });
}

export const useRemoveFromWishlist = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ({ wishlistItemId, accessToken }: { wishlistItemId: number; accessToken?: string }) => 
            removeFromWishlist(wishlistItemId, accessToken),
        onMutate: async ({ wishlistItemId, accessToken }) => {
            await queryClient.cancelQueries({ queryKey: ["wishlist", accessToken] });
            const previousWishlist = queryClient.getQueryData<Wishlist[]>(["wishlist", accessToken]);

            queryClient.setQueryData<Wishlist[]>(["wishlist", accessToken], (old) => 
                old?.filter((item) => item.id !== wishlistItemId)
            );

            return { previousWishlist };
        },
        onSuccess: () => {
            toast.success("Removed from wishlist");
        },
        onError: (err, variables, context) => {
            if (context?.previousWishlist) {
                queryClient.setQueryData(["wishlist", variables.accessToken], context.previousWishlist);
            }
            toast.error("Failed to remove from wishlist");
        },
        onSettled: (data, error, variables) => {
            queryClient.invalidateQueries({ queryKey: ["wishlist", variables.accessToken] });
            queryClient.invalidateQueries({ queryKey: ["wishlist-detailed", variables.accessToken] });
            queryClient.invalidateQueries({ queryKey: ["products"] });
            queryClient.invalidateQueries({ queryKey: ["product"] });
        },
    });
}

import { Product } from "@/types/product";

export const useWishlistToggle = (
    product: Product | ProductListItem, 
    accessToken?: string,
    options: { enabled?: boolean } = { enabled: true }
) => {
    const { data: wishlistItems, isFetching, isFetched } = useWishlist(accessToken, options.enabled);
    const addToWishlistMutation = useAddToWishlist();
    const removeFromWishlistMutation = useRemoveFromWishlist();

    const baseProductId = product.id;

    const wishlistItem = wishlistItems?.find((item) => {
        const itemProduct = item.product as { product_id?: number; id?: number } | number;
        const itemProductId = typeof itemProduct === 'object' ? (itemProduct.id) : itemProduct;
        return Number(itemProductId) === Number(baseProductId);
    });

    const isInWishlist = (accessToken && options.enabled && isFetched)
        ? !!wishlistItem
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        : (product as any).is_wishlist;

    const isLoading = addToWishlistMutation.isPending || removeFromWishlistMutation.isPending || isFetching;

    const toggleWishlist = async () => {
        if (isLoading || !accessToken) return;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let wishlistItemId = (product as any).wishlist_id;
        
        if (!wishlistItemId && wishlistItems) {
            const foundItem = wishlistItems.find((item) => {
                const itemProduct = item.product as { id?: number } | number;
                const itemProductId = typeof itemProduct === 'object' ? itemProduct.id : itemProduct;
                return Number(itemProductId) === Number(baseProductId);
            });
            wishlistItemId = foundItem?.id;
        }

        if (isInWishlist && wishlistItemId) {
            await removeFromWishlistMutation.mutateAsync({
                wishlistItemId,
                accessToken,
            });
        } else if (!isInWishlist) {
            await addToWishlistMutation.mutateAsync({
                productId: baseProductId,
                accessToken,
            });
        } else {
            toast.error("Please refresh to update wishlist status");
        }
    };

    return { isInWishlist, isLoading, toggleWishlist };
};

