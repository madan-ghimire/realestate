"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function TermsPage() {
  //   const searchParams = useSearchParams();
  const router = useRouter();

  //   const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleAgree = () => {
    // You can also store this in localStorage or send to API if needed
    // router.push(callbackUrl);
    router.push("/auth/signin");
  };

  const handleDisagree = () => {
    router.push("/terms");
  };

  return (
    <main className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-xl shadow-lg">
        <CardContent className="space-y-4 p-6 text-sm">
          <p className="font-bold">
            You are accessing a Real Estate Information System (REIS) that is
            provided for authorized use only. By using this REIS (which includes
            any device attached to this system), you consent to the following
            conditions:
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              The platform monitors user activity including listing, messaging,
              and transaction behavior for security, compliance, and quality
              assurance.
            </li>
            <li>
              We reserve the right to inspect, audit, or restrict access to
              accounts suspected of fraud or terms violation.
            </li>
            <li>
              Do not list inaccurate or misleading property data or impersonate
              others.
            </li>
            <li>
              This system may include security measures such as authentication,
              access controls, and activity logging.
            </li>
            <li>
              Use of this system does not constitute a legal agreement unless
              signed separately by both parties.
            </li>
            <li>
              Communications and documents within this system are protected.
              View our{" "}
              <a
                href="/privacy"
                className="font-extrabold text-blue-600 underline hover:text-blue-700"
              >
                Privacy Policy
              </a>{" "}
              for more details.
            </li>
          </ul>
          <p className="font-medium">
            By clicking Agree below you agree to these terms and conditions.
          </p>

          <div className="flex justify-between gap-4 pt-4">
            <Button
              variant="outline"
              className="cursor-pointer"
              onClick={handleDisagree}
            >
              Disagree
            </Button>
            <Button onClick={handleAgree} className="cursor-pointer">
              Agree
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
