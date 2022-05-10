import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { destroyCookie, parseCookies } from "nookies";
import { AuthTokenError } from "../errors/authTokenError";

export function withSSRAuth<P>(fn: GetServerSideProps<P>) {

    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
        const cookies = parseCookies(ctx);

        if (!cookies["super-price.token"]) {
            return {
                redirect: {
                    destination: "/",
                    permanent: false
                }
            }
        }

        try {
            return await fn(ctx);
        } catch (err) {

            if (err instanceof AuthTokenError) {

                destroyCookie(ctx, "super-price.token")
                destroyCookie(ctx, "super-price.refreshToken")

                return {
                    redirect: {
                        destination: "/",
                        permanent: false
                    }
                }
            }

        }
    }
}