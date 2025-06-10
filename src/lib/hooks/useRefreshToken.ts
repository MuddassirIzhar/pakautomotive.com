"use client";

import { axiosAuth, axiosInstance } from "../axiosInstance";
import { signIn, signOut, useSession } from "next-auth/react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { VALIDATE_REFRESH_TOKEN_ROUTE } from "@/utils/ApiRoutes";

export const useRefreshToken = () => {
  const { data: session } = useSession();

  const refreshToken = async () => {
    try {
        const res = await axiosInstance.post(VALIDATE_REFRESH_TOKEN_ROUTE, {
              refresh: session?.user.refreshToken,
            });
            if (session) {
              session.user.accessToken = res.data.accessToken;
              session.user.refreshToken = res.data.refreshToken;
            }
            else {
              signIn();
            }
      } catch (error: any) {
        if (axios.isAxiosError(error)) {
            if (error.response?.data?.errors?.length > 0) {
                toast.error(error.response?.data?.errors[0],{
                    style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                    },
                });
            }
            toast.error(error.response?.data.message,{
                style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
                },
            });
        } else {
            toast.error(error.message,{
                style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
                },
            });
        }
        if(error?.response?.status === 401){
          signOut();
        }
    }
  };
  return refreshToken;
};