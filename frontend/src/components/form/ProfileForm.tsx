import { useEditPasienMutation } from "@/lib/react-query/queriesAndMutation";
import { editProfileSchema } from "@/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "../ui/use-toast";
import {
  REACT_APP_CLOUDINARY_PRESET_KEY,
  REACT_APP_CLOUDINARY_URL,
} from "@/lib/cloudinary";
import axios from "axios";
import Spinner from "../shared/Spinner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";

interface Props {
  nama: string;
  nomor_telepon: string;
  email: string;
  alamat: string;
  token: string;
  id: string;
  tanggal_lahir: Date;
  jenis_kelamin: string;
  nomor_identitas: string;
  refetch: () => void;
}

const ProfileForm = ({
  nama,
  nomor_telepon,
  email,
  alamat,
  token,
  id,
  tanggal_lahir,
  jenis_kelamin,
  nomor_identitas,
  refetch,
}: Props) => {
  const gambarInput = useRef<HTMLInputElement>(null);
  const { mutateAsync: editPasien } = useEditPasienMutation();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof editProfileSchema>>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      nama,
      nomor_telepon,
      email,
      alamat,
      password: "12345678",
    },
  });

  async function onSubmit(values: z.infer<typeof editProfileSchema>) {
    try {
      setIsLoading(true);
      const image = gambarInput.current?.files?.[0];
      if (!image)
        return toast({ variant: "destructive", title: "Gambar tidak ada" });
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", REACT_APP_CLOUDINARY_PRESET_KEY);
      const response = await axios.post(REACT_APP_CLOUDINARY_URL, formData);
      const data = await response.data.secure_url;
      const { nama, email, password, nomor_telepon, alamat } = values;
      await editPasien({
        id,
        token,
        nama,
        email,
        password,
        nomor_telepon,
        alamat,
        jenis_kelamin,
        tanggal_lahir,
        nomor_identitas,
        image: data,
      });
      toast({
        title: "Berhasil mengubah profile",
      });
      refetch();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Gagal mengubah profile",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className="text-slate-600 font-semibold text-sm mt-2 w-fit"
        >
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Edit Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="nama"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nomor_telepon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nomor Telepon</FormLabel>
                  <FormControl>
                    <Input type="number" className="remove-arrow" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="alamat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alamat</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-2 ">
              <FormLabel>Gambar</FormLabel>
              <Input
                type="file"
                placeholder="Masukkan gambar"
                ref={gambarInput}
                accept="image/*"
              />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? <Spinner /> : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileForm;
