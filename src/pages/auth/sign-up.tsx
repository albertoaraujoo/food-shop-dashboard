import { useMutation } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as zod from "zod";

import { registerRestaurant } from "@/api/registerRestaurant";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const signUpForm = zod.object({
  email: zod.string().email(),
  restaurantName: zod.string(),
  managerName: zod.string(),
  phone: zod.string(),
});

type SignUpForm = zod.infer<typeof signUpForm>;

export const SignUp = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpForm>();

  const { mutateAsync: registerRestaurantFn } = useMutation({
    mutationFn: registerRestaurant,
  });

  const handleSignUp = async (data: SignUpForm) => {
    try {
      await registerRestaurantFn({
        restaurantName: data.restaurantName,
        managerName: data.managerName,
        email: data.email,
        phone: data.phone,
      });
      toast.success("Restaurant successfully registered.", {
        action: {
          label: "Login",
          onClick: () => navigate(`/sign-in?email=${data.email}`),
        },
      });
    } catch (error) {
      toast.error("Error when registering restaurant.");
    }
  };

  return (
    <>
      <Helmet title="Sign Up" />
      <div className="p-8 ">
        <Button variant="ghost" asChild className="absolute right-8 top-8">
          <Link to="/sign-in">Sign In</Link>
        </Button>
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create free account
            </h1>
            <p className="text-sm text-muted-foreground">
              Be a partner and start your sales!
            </p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit(handleSignUp)}>
            <div className="space-y-2">
              <Label htmlFor="restaurantName">Business Name</Label>
              <Input
                id="restaurantName"
                type="text"
                {...register("restaurantName")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="managerName">Your Name</Label>
              <Input
                id="managerName"
                type="text"
                {...register("managerName")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register("email")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" {...register("phone")} />
            </div>
            <Button disabled={isSubmitting} className="w-full" type="submit">
              Complete registration
            </Button>

            <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
              By continuing, you agree to our{" "}
              <a className="underline underline-offset-4" href="#">
                Terms of Service
              </a>{" "}
              and{" "}
              <a className="underline underline-offset-4" href="#">
                Privacy Policies
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </>
  );
};
