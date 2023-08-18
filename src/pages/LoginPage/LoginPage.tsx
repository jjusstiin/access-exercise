import { zodResolver } from "@hookform/resolvers/zod";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { z } from "zod";
import { commonStringRegex } from "../../helpers/helper";
import { useForm } from "react-hook-form";
import encryptionUtil from "../../utils/encryption-util";

const FormSchema = z.object({
  userId: z
    .string()
    .regex(commonStringRegex, {
      message: "請輸入正確帳號",
    })
    .min(1, {
      message: "請輸入帳號",
    }),
  pwd: z
    .string()
    .regex(commonStringRegex, {
      message: "密碼",
    })
    .min(1, {
      message: "請輸入密碼",
    }),
});

type FormSchemaType = z.infer<typeof FormSchema>;

const LoginPage = (): JSX.Element => {
  const { getValues } = useForm<FormSchemaType>({
    defaultValues: {
      userId: "",
      pwd: "",
    },
    mode: "onChange",
    resolver: zodResolver(FormSchema),
  });

  /**
   * submit
   */
  function handleSubmit() {
    const encryptedPwd = encryptionUtil.encrypt(getValues().pwd);
    console.log(encryptedPwd);

    if (!encryptedPwd) {
      console.error("encrypt fail");

      return;
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="h-screen w-full flex justify-content-center align-items-center">
        <div className="md:w-5 flex flex-column align-items-s justify-content-center gap-6 py-5">
          <div className="flex flex-wrap justify-content-center align-items-center gap-2">
            <label htmlFor="username" className="w-6rem">
              Username
            </label>
            <InputText id="username" type="text" />
          </div>
          <div className="flex flex-wrap justify-content-center align-items-center gap-2">
            <label htmlFor="password" className="w-6rem">
              Password
            </label>
            <InputText id="password" type="password" />
          </div>
          <Button
            label="Login"
            icon="pi pi-user"
            className="w-10rem mx-auto"
            type="submit"
          ></Button>
        </div>
      </div>
    </form>
  );
};

export default LoginPage;
