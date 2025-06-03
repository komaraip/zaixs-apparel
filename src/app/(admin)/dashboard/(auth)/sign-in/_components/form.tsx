"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { useFormStatus } from "react-dom";
import { useActionState } from 'react';
import { SignIn } from "../lib/actions";
import { ActionResult } from "@/types";



const initialState: ActionResult = {
	error: "",
};

function SubmitButton() {
	const { pending } = useFormStatus();

	return (
		<Button type="submit" className="w-full" disabled={pending}>
			{pending ? "Loading..." : "Sign in"}
		</Button>
	);
}

export default function FormSignIn() {
	const [, formAction] = useActionState(SignIn, initialState);

	return (
		<form action={formAction}>
			<Card className="w-full max-w-sm">
				<CardHeader>
					<CardTitle className="text-2xl text-center">ADMIN DASHBOARD</CardTitle>
				</CardHeader>
				<CardContent className="grid gap-6">
					<div className="grid gap-4">
						<Label htmlFor="email">Email</Label>
						<Input
							name="email"
							id="email"
							type="email"
						/>
					</div>
					<div className="grid gap-4">
						<Label htmlFor="password">Password</Label>
						<Input name="password" id="password" type="password"/>
					</div>
				</CardContent>
				<CardFooter>
					<SubmitButton />
				</CardFooter>
			</Card>
		</form>
	);
}