"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axiosInstance";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema, registerSchema } from "./validation";
import toast from "react-hot-toast";
import { REGISTER_ROUTE } from "@/utils/ApiRoutes";
import programmingSVG from "../../assets/programming.svg";
import LogoImg from "../../assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaSpinner } from "react-icons/fa6";

interface registerForm {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	passwordConfirmation: string;
}

interface loginForm {
	email: string;
	password: string;
}

export default function Form() {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const registerOptions = {
		resolver: yupResolver(registerSchema),
	};
	const {
		register: registerFields,
		control: registerControl,
		formState: { errors: registerErrors },
		reset: registerFormReset,
		handleSubmit: submitRegister,
		setValue: setRegister,
		getValues: getRegister,
	} = useForm<registerForm>(registerOptions);
	const router = useRouter();

	const onSubmitRegister = async (
		data: FormEvent<HTMLFormElement> | any,
		e: any
	) => {
		setIsLoading(true);
		try {
			const res = await axiosInstance.post(REGISTER_ROUTE, data);
			toast.success(res?.data?.message);
			registerFormReset();
			e.target.reset();
			setIsLoading(false);
		} catch (error: any) {
			console.log(error);
			if (axios.isAxiosError(error)) {
				if (error.response?.data?.length > 0) {
					error.response?.data.map((message: any, i: number) => {
						toast.error(message.message, {
							style: {
								borderRadius: "10px",
								background: "#333",
								color: "#fff",
							},
						});
					});
					setIsLoading(false);
				} else if (error.response?.data?.errors?.length > 0) {
					toast.error(error.response?.data?.errors[0], {
						style: {
							borderRadius: "10px",
							background: "#333",
							color: "#fff",
						},
					});
					setIsLoading(false);
				} else {
					toast.error(error.response?.data.message, {
						style: {
							borderRadius: "10px",
							background: "#333",
							color: "#fff",
						},
					});
				}
				setIsLoading(false);
			} else {
				toast.error(error.message, {
					style: {
						borderRadius: "10px",
						background: "#333",
						color: "#fff",
					},
				});
				setIsLoading(false);
			}
		}
	};

	const loginOptions = {
		resolver: yupResolver(loginSchema),
	};
	const {
		register: loginFields,
		control: loginControl,
		formState: { errors: loginErrors },
		reset: loginFormReset,
		handleSubmit: submitLogin,
		setValue: setLogin,
		getValues: getLogin,
	} = useForm<loginForm>(loginOptions);
	// const handleLoginSubmit = async (e: FormEvent<HTMLFormElement>) => {
	const onSubmitLogin = async (
		data: FormEvent<HTMLFormElement> | any,
		e: any
	) => {
		setIsLoading(true);
		e.preventDefault();
		// const formData = new FormData(e.currentTarget);
		const response = await signIn("credentials", {
			email: data.email,
			password: data.password,
			redirect: false,
		});
		if (!response?.error) {
			toast.success("signin successfully!", {
				style: {
					borderRadius: "10px",
					background: "#333",
					color: "#fff",
				},
			});
			router.push("/dashboard");
			router.refresh();
		} else {
			toast.error(response.error, {
				style: {
					borderRadius: "10px",
					background: "#333",
					color: "#fff",
				},
			});
			setIsLoading(false);
		}
	};
	async function handleGithubLogin() {
		signIn("github", { callbackUrl: "http://localhost:3000" });
	}
	const handleGoogleLogin = async () => {
		signIn("google", {
			callbackUrl: "http://localhost:3000/api/auth/callback/google",
		});
	};

	const [tab, setTab] = useState<string>("login");

	const onTabChange = (value:string) => {
	  setTab(value);
	}
  
	return (
		<>
			<div className="mt-12 flex justify-center">
				<div className="max-w-screen-xl m-0 sm:m-6 bg-white border rounded-xl shadow-xl flex justify-center flex-1">
					<div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
						{/* <div>
							<Image src={LogoImg} alt="" className="w-64 mx-auto" priority />
						</div> */}
						<div className="flex flex-col items-center">
							<div className="w-full flex-1">
								<div className="p-3 mt-4 bg-theme-primary dark:border-gray-700">
									<Tabs value={tab} onValueChange={onTabChange} className="w-full min-h-[500px]">
										<TabsList className="grid w-full grid-cols-2">
											<TabsTrigger value="login">Login</TabsTrigger>
											<TabsTrigger value="register">Register</TabsTrigger>
										</TabsList>
										<TabsContent value="login">
											<Card className="border-none shadow-none">
												{/* <CardHeader>
													<CardTitle>Login</CardTitle>
													<CardDescription>
														Make changes to your login here. Click save when
														you're done.
													</CardDescription>
												</CardHeader> */}
												<CardContent className="p-0 space-y-2">
														<Button type="button"
															onClick={handleGoogleLogin}
															className="w-full px-6 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-primary hover:bg-primary focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50 flex items-center justify-center mt-4"
														>
															<div className="px-4 py-2">
																<svg className="w-6 h-6" viewBox="0 0 48 48">
																	<path
																		fill="#FFC107"
																		d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
																	></path>
																	<path
																		fill="#FF3D00"
																		d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
																	></path>
																	<path
																		fill="#4CAF50"
																		d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
																	></path>
																	<path
																		fill="#1976D2"
																		d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
																	></path>
																</svg>
															</div>
															<span className="w-5/6 px-4 py-2 text-center">
																Sign in with Google
															</span>
														</Button>
														<Button type="button" className="w-full px-6 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-primary hover:bg-primary focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50 flex items-center justify-center mt-4">
															<div className="px-4 py-2">
																<svg className="w-6 h-6" viewBox="0 0 24 24">
																	<path d="M 4.4042969 3 C 3.7572969 3 3.3780469 3.7287656 3.7480469 4.2597656 L 9.7363281 12.818359 L 3.7246094 19.845703 C 3.3356094 20.299703 3.6578594 21 4.2558594 21 L 4.9199219 21 C 5.2129219 21 5.4916406 20.871437 5.6816406 20.648438 L 10.919922 14.511719 L 14.863281 20.146484 C 15.238281 20.680484 15.849953 21 16.501953 21 L 19.835938 21 C 20.482937 21 20.862187 20.272188 20.492188 19.742188 L 14.173828 10.699219 L 19.900391 3.9902344 C 20.232391 3.6002344 19.955359 3 19.443359 3 L 18.597656 3 C 18.305656 3 18.027891 3.1276094 17.837891 3.3496094 L 12.996094 9.0097656 L 9.3945312 3.8554688 C 9.0205313 3.3194687 8.4098594 3 7.7558594 3 L 4.4042969 3 z"></path>
																</svg>
															</div>
															<span className="w-5/6 px-4 py-2 text-center">
																Sign in with Twitter
															</span>
														</Button>
														<Button type="button"
															onClick={handleGithubLogin}
															className="w-full px-6 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-primary hover:bg-primary focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50 flex items-center justify-center mt-4"
														>
															<div className="px-4 py-2">
																<svg className="w-6 h-6" viewBox="0 0 30 30">
																	<path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
																</svg>
															</div>
															<span className="w-5/6 px-4 py-2 text-center">
																Sign in with GitHub
															</span>
														</Button>
														<div className="flex items-center justify-between mt-8">
															<span className="w-1/5 border-b border-theme-primary dark:border-theme-primary lg:w-1/4"></span>
															<span className="text-xs text-center text-gray-900 uppercase dark:text-gray-400 hover:underline">
																or
															</span>
															<span className="w-1/5 border-b border-theme-primary dark:border-gray-400 lg:w-1/4"></span>
														</div>
														<form onSubmit={submitLogin(onSubmitLogin)}>
															<div className="mt-4">
																<Label htmlFor="email">Email</Label>
																<Input
																	id="email"
																	type="email"
																	{...loginFields("email")}
																	className={
																		loginErrors.email ? "border-red-500" : ""
																	}
																/>
																{loginErrors.email && (
																	<p className="text-red-500 text-sm">
																		{loginErrors.email.message}
																	</p>
																)}
															</div>
															<div className="mt-4">
																<Label htmlFor="password">Password</Label>
																<Input
																	id="password"
																	type="password"
																	{...loginFields("password")}
																	className={
																		loginErrors.password ? "border-red-500" : ""
																	}
																/>
																{loginErrors.password && (
																	<p className="text-red-500 text-sm">
																		{loginErrors.password.message}
																	</p>
																)}
															</div>
															<div className="mt-6">
																<Button
																	type="submit"
																	className="w-full"
																	disabled={isLoading}
																>
																	{isLoading ? (
																		<>
																			<FaSpinner className="animate-spin-slow" />{" "}
																			Loading...{" "}
																		</>
																	) : (
																		<> Login </>
																	)}
																</Button>
															</div>
														</form>
														<div className="flex items-center justify-center mt-2">
															<a
																href="#"
																className="text-xs text-gray-900 dark:text-gray-300 hover:underline"
															>
																Forget Password?
															</a>
														</div>
												</CardContent>
											</Card>
										</TabsContent>
										<TabsContent value="register">
											<Card className="border-none shadow-none">
												{/* <CardHeader>
													<CardTitle>Register</CardTitle>
													<CardDescription>
														Change your password here. After saving, you'll be
														logged out.
													</CardDescription>
												</CardHeader> */}
												<CardContent className="p-0 space-y-2">
														<form
															onSubmit={submitRegister(onSubmitRegister)}
															autoComplete="new-password"
															id="reset"
														>
															<div className="mt-4">
																<Label htmlFor="firstName">First Name</Label>
																<Input
																	id="firstName"
																	type="text"
																	{...registerFields("firstName")}
																	className={
																		registerErrors.firstName
																			? "border-red-500"
																			: ""
																	}
																/>
																{registerErrors.firstName && (
																	<p className="text-red-500 text-sm">
																		{registerErrors.firstName.message}
																	</p>
																)}
															</div>
															<div className="mt-4">
																<Label htmlFor="lastName">Last Name</Label>
																<Input
																	id="lastName"
																	type="text"
																	{...registerFields("lastName")}
																	className={
																		registerErrors.lastName
																			? "border-red-500"
																			: ""
																	}
																/>
																{registerErrors.lastName && (
																	<p className="text-red-500 text-sm">
																		{registerErrors.lastName.message}
																	</p>
																)}
															</div>
															<div className="mt-4">
																<Label htmlFor="register-email">Email</Label>
																<Input
																	id="register-email"
																	type="email"
																	{...registerFields("email")}
																	className={
																		registerErrors.email ? "border-red-500" : ""
																	}
																/>
																{registerErrors.email && (
																	<p className="text-red-500 text-sm">
																		{registerErrors.email.message}
																	</p>
																)}
															</div>
															<div className="mt-4">
																<Label htmlFor="password">Password</Label>
																<Input
																	id="password"
																	type="password"
																	autoComplete="new-password"
																	{...registerFields("password")}
																	className={
																		registerErrors.password
																			? "border-red-500"
																			: ""
																	}
																/>
																{registerErrors.password && (
																	<p className="text-red-500 text-sm">
																		{registerErrors.password.message}
																	</p>
																)}
															</div>
															<div className="mt-4">
																<Label htmlFor="passwordConfirmation">
																	Password Confirmation
																</Label>
																<Input
																	id="passwordConfirmation"
																	type="password"
																	autoComplete="new-password"
																	{...registerFields("passwordConfirmation")}
																	className={
																		registerErrors.passwordConfirmation
																			? "border-red-500"
																			: ""
																	}
																/>
																{registerErrors.passwordConfirmation && (
																	<p className="text-red-500 text-sm">
																		{
																			registerErrors.passwordConfirmation
																				.message
																		}
																	</p>
																)}
															</div>
															<div className="mt-6">
																<Button
																	type="submit"
																	className="w-full"
																	disabled={isLoading}
																>
																	{isLoading ? (
																		<>
																			<FaSpinner className="animate-spin-slow" />{" "}
																			Loading...{" "}
																		</>
																	) : (
																		<> Register </>
																	)}
																</Button>
																<div className="flex items-center justify-center mt-2">
																	<span
																		onClick={() => {
																			onTabChange("login");
																		}}
																		className="text-xs text-gray-900 dark:text-gray-300"
																	>
																		already registered go to{" "}
																		<b className="text-theme-primary hover:underline">
																			{" "}
																			LOGIN{" "}
																		</b>
																	</span>
																</div>
															</div>
														</form>
												</CardContent>
											</Card>
										</TabsContent>
									</Tabs>
								</div>
							</div>
						</div>
					</div>
					<div className="flex-1 bg-theme-primary text-center hidden lg:flex">
						<div
							className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
							style={{
								backgroundImage: `url(${programmingSVG.src})`,
							}}
						></div>
					</div>
				</div>
			</div>
		</>
	);
}
