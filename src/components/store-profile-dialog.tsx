import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as zod from "zod";

import {
  getManagedRestaurant,
  GetManagedRestaurantBody,
} from "@/api/get-managed-restaurant";
import { updateProfile } from "@/api/update-profile";

import { Button } from "./ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

const StoreProfileDialogSchema = zod.object({
  name: zod.string().min(1),
  description: zod.string().nullable(),
});

type StoreProfileDialogForm = zod.infer<typeof StoreProfileDialogSchema>;

export const StoreProfileDialog = () => {
  const queryClient = useQueryClient();

  const { data: managedRestaurant } = useQuery({
    queryKey: ["manager-restaurant"],
    queryFn: getManagedRestaurant,
    staleTime: Infinity,
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<StoreProfileDialogForm>({
    resolver: zodResolver(StoreProfileDialogSchema),
    values: {
      name: managedRestaurant?.name ?? "",
      description: managedRestaurant?.description ?? "",
    },
  });

  const updateManagedRestaurantCache = ({
    name,
    description,
  }: StoreProfileDialogForm) => {
    const cached = queryClient.getQueryData<GetManagedRestaurantBody>([
      "manager-restaurant",
    ]);

    if (cached) {
      queryClient.setQueryData<GetManagedRestaurantBody>(
        ["manager-restaurant"],
        {
          ...cached,
          name,
          description,
        },
      );
    }

    return { cached };
  };

  const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: updateProfile,
    onMutate({ name, description }) {
      const { cached } = updateManagedRestaurantCache({ name, description });
      return { previousProfile: cached };
    },
    onError(_, __, context) {
      if (context?.previousProfile) {
        updateManagedRestaurantCache(context.previousProfile);
      }
    },
  });

  const handleUpdateProfile = async (data: StoreProfileDialogForm) => {
    try {
      await updateProfileFn({
        name: data.name,
        description: data?.description,
      });
      toast.success("Profile successfully updated.");
    } catch (error) {
      toast.error("Failed to update the profile. Try again.");
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Store Profile</DialogTitle>
        <DialogDescription>
          Update your store profile information
        </DialogDescription>
        <form onSubmit={handleSubmit(handleUpdateProfile)}>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right" htmlFor="name">
                Name
              </Label>
              <Input id="name" className="col-span-3" {...register("name")} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right" htmlFor="description">
                Description
              </Label>
              <Textarea
                id="description"
                className="col-span-3"
                {...register("description")}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={isSubmitting} type="submit" variant="success">
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogHeader>
    </DialogContent>
  );
};
