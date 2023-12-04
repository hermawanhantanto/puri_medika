import Spinner from "@/components/shared/Spinner";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";
import {
  useDeletePasienMutation,
  useEditPasienMutation,
  useSignUpMutation,
} from "@/lib/react-query/queriesAndMutation";
import { cn } from "@/lib/utils";
import { IPasien } from "@/types";
import { registerSchema } from "@/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import "./Input.css";

interface Props {
  pasien?: IPasien;
}

const PasienForm = ({ pasien }: Props) => {
  const { toast } = useToast();
  const { mutateAsync: signUp, isPending } = useSignUpMutation();
  const { user } = useAuth();
  const { token } = user!;
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof registerSchema>>({
    defaultValues: {
      nama: pasien?.nama || "",
      email: pasien?.email || "",
      password: pasien ? "12345678" : "",
      nomor_identitas: pasien?.nomor_identitas || "",
      jenis_kelamin: pasien?.jenis_kelamin || "L",
      tanggal_lahir: pasien?.tanggal_lahir
        ? new Date(pasien?.tanggal_lahir)
        : new Date(),
      nomor_telepon: pasien?.nomor_telepon || "",
      alamat: pasien?.alamat || "",
    },
    resolver: zodResolver(registerSchema),
  });

  const { mutateAsync: editPasien, isPending: isEditPending } =
    useEditPasienMutation();

  const { mutateAsync: deletePasien, isPending: isDeletePending } =
    useDeletePasienMutation();

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    try {
      const {
        nama,
        email,
        password,
        nomor_identitas,
        jenis_kelamin,
        tanggal_lahir,
        nomor_telepon,
        alamat,
      } = values;
      if (pasien) {
        await editPasien({
          id: pasien.id,
          nama,
          email,
          password,
          nomor_identitas,
          jenis_kelamin,
          tanggal_lahir,
          nomor_telepon,
          alamat,
          token,
        });
        toast({
          title: "Success",
          description: "Pasien berhasil diupdate",
        });
        return navigate("/admin/pasien");
      }
      await signUp({
        nama,
        email,
        password,
        nomor_identitas,
        jenis_kelamin,
        tanggal_lahir,
        nomor_telepon,
        alamat,
      });
      toast({
        title: "Success",
        description: "Pasien berhasil ditambahkan",
      });
      return navigate("/admin/pasien");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
      });
    }
  }

  const handleDelete = async () => {
    try {
      await deletePasien({
        id: pasien!.id,
        token,
      });
      toast({
        title: "Success",
        description: "Pasien berhasil dihapus",
      });
      return navigate("/admin/pasien");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
      });
    }
  };

  return (
    <section className="flex flex-col">
      <h4 className="font-semibold sm:text-2xl text-xl tracking-wide mb-8">
        Pasien
      </h4>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="sm:min-w-[600px] flex flex-col"
        >
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-6 items-center">
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
              name="nomor_identitas"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nomor Identitas</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="jenis_kelamin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jenis Kelamin</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Jenis Kelamin" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="L">Laki-Laki</SelectItem>
                      <SelectItem value="P">Perempuan</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tanggal_lahir"
              render={({ field }) => (
                <FormItem className="flex flex-col ">
                  <FormLabel className="p-1">Tanggal Lahir</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
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
          </div>
          <div className="flex items-center justify-end gap-4 mt-8">
            {pasien && (
              <Button
                className="w-fit min-w-[120px]"
                variant="destructive"
                type="button"
                onClick={handleDelete}
              >
                {isDeletePending ? <Spinner /> : "Delete"}
              </Button>
            )}

            <Button
              type="submit"
              className="w-fit min-w-[120px]"
              disabled={isPending}
            >
              {isPending ? <Spinner /> : isEditPending ? <Spinner /> : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default PasienForm;
