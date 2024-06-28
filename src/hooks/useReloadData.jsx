import { useAuth } from "./useAuth";
import { useAxiosPrivate } from "./useAxiosPrivate";
import { useProductContext } from "./useProductContext";
import { useRefresh } from "./useRefresh";

export const useReloadData = () => {
  const axiosPrivate = useAxiosPrivate();
  const { dispatch } = useProductContext();
  const { persist } = useAuth();
  const refresh = useRefresh();

  const fetchAndUpdateUserWishlist = async () => {
    try {
      const response = await axiosPrivate.get("/user/fetchwishlist");
      if (response.status === 200) {
        dispatch({
          type: "UPDATE-USER-WISHLIST-FROM-SERVER",
          payload: response.data.userWishlist,
        });
      }
    } catch (error) {
      console.log("unable to reload user wishlist");
    }
  };

  const fetchAndUpdateUserCartItem = async () => {
    try {
      const response = await axiosPrivate.get("/user/fetchcart");

      dispatch({
        type: "FETCH-USER-CART-FROM-SERVER",
        payload: response.data.cartItems,
      });
    } catch (error) {
      console.log("Unable to reload cart items");
    }
  };

  const reloadUserData = async () => {
    await refresh();
    if (persist) {
      await fetchAndUpdateUserWishlist();
      await fetchAndUpdateUserCartItem();
    }
  };

  return reloadUserData;
};
