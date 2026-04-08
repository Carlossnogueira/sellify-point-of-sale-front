import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Field, FieldDescription } from "@/components/ui/field"
import React, { useState } from "react"
import { loginSchema } from "@/features/auth/validators/loginSchema"
import z from "zod"

export function LoginForm() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{
        email?: string;
        password?: string;
    }>({});

    function validateForm() {
        const result = loginSchema.safeParse({ email, password });

        if (!result.success) {
            const fieldErrors = z.treeifyError(result.error);

            setErrors({
                email: fieldErrors.properties?.email?.errors?.[0],
                password: fieldErrors.properties?.password?.errors?.[0]
            });

            return false;
        }

        setErrors({});
        return true;
    }

    function onSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        const isValid = validateForm();

        if (!isValid) return;

        // TODO: Authentication logic here
    }

    return (
        <Card className="max-w-sm w-full">
            <CardHeader className="pb-3 pt-3">
                <CardTitle className="text-center">Login</CardTitle>
                <CardDescription className="text-center">Entre com seus dados para inicial</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={(e) => { onSubmit(e); }}>
                    <div className="flex flex-col space-y-4">
                        <Field
                            {...errors.email && { "data-invalid": true }}
                        >
                            <Label htmlFor="email">Email:</Label>
                            <Input
                                type="text"
                                id="email"
                                placeholder="Seu email"
                                onChange={(e) => setEmail(e.target.value)}
                                {...errors.email && { "aria-invalid": true }}
                            />
                            {errors.email && (<FieldDescription className="text-destructive">{errors.email}</FieldDescription>)}
                        </Field>
                        <Field
                            {...errors.password && { "data-invalid": true }}
                        >
                            <Label htmlFor="password">Senha:</Label>
                            <Input
                                type="password"
                                id="password"
                                placeholder="Sua senha"
                                onChange={(e) => setPassword(e.target.value)}
                                {...errors.password && { "aria-invalid": true }}
                            />
                            {errors.password && (<FieldDescription className="text-destructive">{errors.password}</FieldDescription>)}
                        </Field>
                    </div>
                    <div className="flex items-center flex-col pt-3 pb-3">
                        <Button type="submit" className="w-full mt-4">Login</Button>
                        <p className="text-sm text-muted-foreground pt-2">Se esqueceu a senha, contate o gerente</p>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}