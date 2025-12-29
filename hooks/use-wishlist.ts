import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addToWishlist, getWishlist, removeFromWishlist } from "@/services/wishlist";

export const useWishlist = (userId: number, accessToken?: string) => {
    return useQuery({
        queryKey: ["wishlist", userId],
        queryFn: () => getWishlist(userId, accessToken),
        enabled: !!userId,
    });
}

export const useAddToWishlist = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ({ userId, productId, accessToken }: { userId: number; productId: number; accessToken?: string }) => 
            addToWishlist(userId, productId, accessToken),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["wishlist"] });
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
        },
    });
}

