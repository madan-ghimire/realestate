"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-xl shadow-lg">
        <CardContent className="space-y-4 p-6 text-sm">
          <p className="font-bold">
            Privacy Policy for Real Estate Information System (REIS)
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              We collect personal data such as name, contact details, and
              property preferences for account creation and service delivery.
            </li>
            <li>
              User data is encrypted and stored securely. We implement access
              controls and audit trails to protect sensitive information.
            </li>
            <li>
              We do not share, sell, or rent your information with third parties
              without your consent, except where required by law.
            </li>
            <li>
              We may use cookies and third-party analytics tools to improve user
              experience and gather usage insights.
            </li>
            <li>
              You may access, update, or delete your personal information
              through your account dashboard at any time.
            </li>
            <li>
              For more information, please refer to our full{" "}
              <Link
                href="/terms"
                className="font-extrabold text-blue-600 underline hover:text-blue-700"
              >
                Terms of Service
              </Link>
              .
            </li>
          </ul>
          <p className="font-medium">
            By using this application, you consent to our data practices as
            outlined in this policy.
          </p>

          <div className="flex justify-end pt-4">
            <Button
              variant="outline"
              className="cursor-pointer"
              onClick={handleBack}
            >
              Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
