import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addToWishlist, getWishlist, removeFromWishlist } from "@/services/wishlist";
import { productApi } from "@/services/product";
import { ProductListItem } from "@/types/product";

export interface WishlistItemWithProduct {
    wishlistId: number;
    product: ProductListItem;
}

export const useWishlist = (userId: number, accessToken?: string) => {
    return useQuery({
        queryKey: ["wishlist", userId],
        queryFn: () => getWishlist(userId, accessToken),
        enabled: !!userId,
    });
}

export const useDetailedWishlist = (userId: number, accessToken?: string) => {
    const { data: wishlistData } = useWishlist(userId, accessToken);

    return useQuery({
        queryKey: ["wishlist-detailed", userId, wishlistData],
        queryFn: async (): Promise<WishlistItemWithProduct[]> => {
            if (!wishlistData || wishlistData.length === 0) return [];

            // Fetch all products to match IDs
            const productsResponse = await productApi.getAll({ page_size: 100 });
            const allProducts = productsResponse.results;

            const items: WishlistItemWithProduct[] = wishlistData
                .map(item => {
                    const product = allProducts.find(p => p.id === item.product);
                    if (!product) return null;
                    return {
                        wishlistId: item.id,
                        product
                    };
                })
                .filter((item): item is WishlistItemWithProduct => item !== null);

            return items;
        },
        enabled: !!userId && !!wishlistData,
    });
}

export const useAddToWishlist = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ({ userId, productId, accessToken }: { userId: number; productId: number; accessToken?: string }) => 
            addToWishlist(userId, productId, accessToken),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["wishlist"] });
            queryClient.invalidateQueries({ queryKey: ["wishlist-detailed"] });
        },
    });
}

export const useRemoveFromWishlist = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ({ wishlistItemId, accessToken }: { wishlistItemId: number; accessToken?: string }) => 
            removeFromWishlist(wishlistItemId, accessToken),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["wishlist"] });
            queryClient.invalidateQueries({ queryKey: ["wishlist-detailed"] });
        },
    });
}

