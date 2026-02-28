"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/Toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const router = useRouter();
  const { showToast } = useToast();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;

        if (data.user) {
          const { error: profileError } = await supabase
            .from("users")
            .insert([{ id: data.user.id, name: email.split("@")[0], email }]);
          if (profileError)
            console.warn("Profile creation failed", profileError);
        }

        showToast("Signup successful! Check email.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        showToast("Login success!");
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      showToast((error as Error).message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleGuest = () => {
    localStorage.setItem("isGuest", "true");
    showToast("Browsing as guest.");
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFD700] py-12 px-4 shadow-[inset_0_0_100px_rgba(0,0,0,0.1)]">
      <div className="max-w-md w-full space-y-8 bg-white border-[4px] border-black p-10 neo-shadow-large">
        <div className="text-center">
          <h2 className="text-4xl font-[900] uppercase tracking-tighter text-black leading-none">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h2>
          <p className="text-xs font-black uppercase tracking-[0.2em] mt-2 opacity-50">
            {isSignUp ? "Join the pro network" : "Sign in to your portal"}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleAuth}>
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest mb-1 ml-1">
                Email
              </label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 border-[3px] border-black font-bold focus:bg-yellow-50 outline-none transition-colors neo-shadow-small"
                placeholder="name@company.com"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest mb-1 ml-1">
                Password
              </label>
              <input
                type="password"
                required
                className="w-full px-4 py-3 border-[3px] border-black font-bold focus:bg-yellow-50 outline-none transition-colors neo-shadow-small"
                placeholder="••••••••"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-4 border-[3px] border-black font-black uppercase text-sm tracking-widest neo-shadow hover:bg-white hover:text-black hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all disabled:opacity-50"
          >
            {loading ? "Processing..." : isSignUp ? "Join Now" : "Enter Portal"}
          </button>
        </form>

        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-black opacity-20" />
          <span className="text-[10px] font-black uppercase tracking-widest opacity-40 italic">
            or
          </span>
          <div className="flex-1 h-px bg-black opacity-20" />
        </div>

        <button
          onClick={handleGuest}
          className="w-full flex items-center justify-center gap-3 py-3 border-[3px] border-black bg-[#4ECDC4] font-black uppercase text-[10px] tracking-[0.2em] neo-shadow-small hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-0"
        >
          <i className="fas fa-user-secret" />
          Continue as Guest
        </button>

        <div className="text-center pt-4">
          <button
            className="text-xs font-black uppercase tracking-widest border-b-2 border-transparent hover:border-black transition-all"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? "Already a member? Log in" : "New here? Create account"}
          </button>
        </div>
      </div>
    </div>
  );
}
