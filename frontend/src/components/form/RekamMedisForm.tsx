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
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";
import {
  useCreateRekamMedisMutation,
  useDeleteRekamMedisMutation,
  useEditRekamMedisMutation,
} from "@/lib/react-query/queriesAndMutation";
import { IRekamMedis } from "@/types";
import { rekamMedisSchema } from "@/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import "./Input.css";

interface Props {
  rekammedis?: IRekamMedis;
}

const RekamMedisForm = ({ rekammedis }: Props) => {
  const { toast } = useToast();
  const { mutateAsync: createRekamMedis, isPending } =
    useCreateRekamMedisMutation();
  const { user } = useAuth();
  const { token } = user!;
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof rekamMedisSchema>>({
    defaultValues: {
      pendaftaran_id: String(rekammedis?.pendaftaran_id) || "",
      keluhan: rekammedis?.keluhan || "",
      diagnosa: rekammedis?.diagnosa || "",
      tindakan: rekammedis?.tindakan || "",
      keterangan: rekammedis?.keterangan || "",
    },
    resolver: zodResolver(rekamMedisSchema),
  });

  const { mutateAsync: editRekamMedis, isPending: isEditPending } =
    useEditRekamMedisMutation();

  const { mutateAsync: deleteRekamMedis, isPending: isDeletePending } =
    useDeleteRekamMedisMutation();

  async function onSubmit(values: z.infer<typeof rekamMedisSchema>) {
    try {
      const { pendaftaran_id, keluhan, diagnosa, tindakan, keterangan } =
        values;

      if (rekammedis) {
        await editRekamMedis({
          id: rekammedis.id,
          pendaftaran_id: Number(pendaftaran_id),
          keluhan,
          diagnosa,
          tindakan,
          keterangan,
          token,
        });

        toast({
          title: "Success",
          description: "Rekam medis berhasil diupdate",
        });
        return navigate("/admin/rekammedis");
      }
      await createRekamMedis({
        pendaftaran_id: Number(pendaftaran_id),
        keluhan,
        diagnosa,
        tindakan,
        keterangan,
        token,
      });
      toast({
        title: "Success",
        description: "Rekam medis berhasil ditambahkan",
      });
      return navigate("/admin/rekammedis");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
      });
    }
  }

  const handleDelete = async () => {
    try {
      await deleteRekamMedis({
        id: rekammedis!.id,
        token,
      });
      toast({
        title: "Success",
        description: "Rekam medis berhasil dihapus",
      });
      return navigate("/admin/rekammedis");
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
        Rekam Medis
      </h4>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="sm:min-w-[600px] flex flex-col"
        >
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-6 items-center">
            <FormField
              control={form.control}
              name="pendaftaran_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>No Pendaftaran ID</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} className="remove-arrow" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="keluhan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Keluhan</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="diagnosa"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Diagnosa</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tindakan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tindakan</FormLabel>
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
          </div>
          <div className="flex items-center justify-end gap-4 mt-8">
            {rekammedis && (
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

export default RekamMedisForm;
