import Spinner from "@/components/shared/Spinner";
import { Button } from "@/components/ui/button";
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";
import {
    useCreateDokterMutation,
    useDeleteDokterMutation,
    useEditDokterMutation
} from "@/lib/react-query/queriesAndMutation";
import { IDokter } from "@/types";
import { dokterSchema } from "@/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import "./Input.css";

interface Props {
  dokter?: IDokter;
}

const DokterForm = ({ dokter }: Props) => {
  const { toast } = useToast();
  const { mutateAsync: createDokter, isPending } = useCreateDokterMutation();
  const { user } = useAuth();
  const { token } = user!;
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof dokterSchema>>({
    defaultValues: {
      nama: dokter?.nama || "",
      spesialis: dokter?.spesialis || "",
      nomor_izin_praktek: dokter?.nomor_izin_praktek || "",
      alamat: dokter?.alamat || "",
      jenis_kelamin: dokter?.jenis_kelamin || "L",
      no_telp: dokter?.no_telp || "",
    },
    resolver: zodResolver(dokterSchema),
  });

  const { mutateAsync: editDokter, isPending: isEditPending } =
    useEditDokterMutation();

  const { mutateAsync: deleteDokter, isPending: isDeletePending } =
    useDeleteDokterMutation();

  async function onSubmit(values: z.infer<typeof dokterSchema>) {
    try {
      const {
        nama,
        spesialis,
        nomor_izin_praktek,
        alamat,
        jenis_kelamin,
        no_telp,
      } = values;
      if (dokter) {
        await editDokter({
          id: dokter.id,
          nama,
          spesialis,
          nomor_izin_praktek,
          alamat,
          jenis_kelamin,
          no_telp,
          token,
        });

        toast({
          title: "Success",
          description: "Dokter berhasil diupdate",
        });
        return navigate("/admin/dokter");
      }
      await createDokter({
        nama,
        spesialis,
        nomor_izin_praktek,
        alamat,
        jenis_kelamin,
        no_telp,
        token,
      });
      toast({
        title: "Success",
        description: "Dokter berhasil ditambahkan",
      });
      return navigate("/admin/dokter");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
      });
    }
  }

  const handleDelete = async () => {
    try {
      await deleteDokter({
        id: dokter!.id,
        token,
      });
      toast({
        title: "Success",
        description: "Dokter berhasil dihapus",
      });
      return navigate("/admin/dokter");
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
        Dokter
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
              name="spesialis"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Spesialis</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nomor_izin_praktek"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nomor Izin Praktek</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
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
              name="no_telp"
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
          </div>
          <div className="flex items-center justify-end gap-4 mt-8">
            {dokter && (
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

export default DokterForm;
