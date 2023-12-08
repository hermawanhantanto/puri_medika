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
    useCreateRuangMutation,
    useDeleteRuangMutation,
    useEditRuangMutation,
} from "@/lib/react-query/queriesAndMutation";
import { IRuang } from "@/types";
import { ruangSchema } from "@/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import "./Input.css";

interface Props {
  ruang?: IRuang;
}

const RuangForm = ({ ruang }: Props) => {
  const { toast } = useToast();
  const { mutateAsync: createRuang, isPending } = useCreateRuangMutation();
  const { user } = useAuth();
  const { token } = user!;
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof ruangSchema>>({
    defaultValues: {
      nama: ruang?.nama || "",
      keterangan: ruang?.keterangan || "",
      status: ruang?.status || "tersedia",
      kapasitas: String(ruang?.kapasitas) || "",
    },
    resolver: zodResolver(ruangSchema),
  });

  const { mutateAsync: editRuang, isPending: isEditPending } =
    useEditRuangMutation();

  const { mutateAsync: deleteRuang, isPending: isDeletePending } =
    useDeleteRuangMutation();

  async function onSubmit(values: z.infer<typeof ruangSchema>) {
    try {
      const { nama, keterangan, status, kapasitas } = values;
      const jumlah = Number(kapasitas);
      if (ruang) {
        await editRuang({
          id: ruang.id,
          nama,
          keterangan,
          status,
          kapasitas: jumlah,
          token,
        });

        toast({
          title: "Success",
          description: "Ruang berhasil diupdate",
        });
        return navigate("/admin/ruang");
      }
      await createRuang({
        nama,
        keterangan,
        status,
        kapasitas: jumlah,
        token,
      });
      toast({
        title: "Success",
        description: "Ruang berhasil ditambahkan",
      });
      return navigate("/admin/ruang");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
      });
    }
  }

  const handleDelete = async () => {
    try {
      await deleteRuang({
        id: ruang!.id,
        token,
      });
      toast({
        title: "Success",
        description: "Ruang berhasil dihapus",
      });
      return navigate("/admin/ruang");
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
        Ruang
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
              name="keterangan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Keterangan</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="tersedia">Tersedia</SelectItem>
                      <SelectItem value="tidak tersedia">
                        Tidak Tersedia
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="kapasitas"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kapasitas</FormLabel>
                  <FormControl>
                    <Input type="number" className="remove-arrow" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center justify-end gap-4 mt-8">
            {ruang && (
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

export default RuangForm;
