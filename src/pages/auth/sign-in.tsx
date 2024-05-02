import { useMutation } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import * as zod from "zod";

import { signIn } from "@/api/sign-in";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const signInForm = zod.object({
  email: zod.string().email(),
});

type SignInForm = zod.infer<typeof signInForm>;

export const SignIn = () => {
  const [searchParams] = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>({
    defaultValues: {
      email: searchParams.get("email") ?? "",
    },
  });

  const { mutateAsync: authenticate } = useMutation({ mutationFn: signIn });

  const handleSignIn = async (data: SignInForm) => {
    try {
      await authenticate({ email: data.email });
      toast.success("We've sent an authentication link to your email.", {
        action: {
          label: "Resend",
          onClick: () => handleSignIn(data),
        },
      });
    } catch (error) {
      toast.error("Invalid credentials");
    }
  };

  return (
    <>
      <Helmet title="Login" />
      <div className="p-8">
        <Button variant="ghost" asChild className="absolute right-8 top-8">
          <Link to="/sign-up">New Business</Link>
        </Button>
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Access Dashboard
            </h1>
            <p className="text-sm text-muted-foreground">
              Track your sales through the partner dashboard!
            </p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register("email")} />
            </div>
            <Button
              variant="default"
              disabled={isSubmitting}
              className="w-full"
              type="submit"
            >
              Access Dashboard
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};
