import { MainNav } from "@/components/navigation/main-nav"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <MainNav />
      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight mb-8">Terms and Conditions</h1>
          
          <div className="prose prose-sm max-w-none space-y-6">
            <section>
              <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Agreement to Terms</h2>
              <p className="text-muted-foreground">
                By accessing or using Faithcal, you agree to be bound by these Terms and Conditions. 
                If you disagree with any part of these terms, you may not access the service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Use License</h2>
              <p className="text-muted-foreground mb-2">
                Permission is granted to temporarily access Faithcal for personal, non-commercial use. 
                This license does not include:
              </p>
              <ul className="list-disc list-inside text-muted-foreground ml-4 space-y-1">
                <li>Modifying or copying materials</li>
                <li>Using materials for commercial purposes</li>
                <li>Removing copyright or proprietary notations</li>
                <li>Transferring materials to another person</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">User Accounts</h2>
              <p className="text-muted-foreground">
                When you create an account with us, you must provide accurate and complete information. 
                You are responsible for safeguarding your account credentials and for all activities 
                that occur under your account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Event Posting</h2>
              <p className="text-muted-foreground mb-2">By posting events on Faithcal, you agree that:</p>
              <ul className="list-disc list-inside text-muted-foreground ml-4 space-y-1">
                <li>All information provided is accurate and truthful</li>
                <li>You have the right to post the event</li>
                <li>Content does not violate any laws or third-party rights</li>
                <li>Media files comply with our guidelines (audio max 30s, video max 20s)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Prohibited Uses</h2>
              <p className="text-muted-foreground mb-2">You may not use Faithcal:</p>
              <ul className="list-disc list-inside text-muted-foreground ml-4 space-y-1">
                <li>In any way that violates applicable laws or regulations</li>
                <li>To transmit harmful or malicious code</li>
                <li>To impersonate any person or entity</li>
                <li>To collect or store personal data about other users</li>
                <li>For any fraudulent or illegal purpose</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Premium Subscriptions</h2>
              <p className="text-muted-foreground">
                Premium subscriptions are billed monthly and automatically renew unless cancelled. 
                You may cancel your subscription at any time. Refunds are subject to our 
                <a href="/refund" className="text-primary hover:underline"> Return/Refund Policy</a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
              <p className="text-muted-foreground">
                All content on Faithcal, including text, graphics, logos, and software, is the property 
                of Faithcal or its content suppliers and is protected by copyright and other intellectual 
                property laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
              <p className="text-muted-foreground">
                Faithcal shall not be liable for any indirect, incidental, special, or consequential 
                damages arising out of or in connection with your use of the service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Changes to Terms</h2>
              <p className="text-muted-foreground">
                We reserve the right to modify these terms at any time. We will notify users of any 
                material changes by posting the new terms on this page.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
              <p className="text-muted-foreground">
                If you have questions about these Terms and Conditions, please contact us at{" "}
                <a href="/contact" className="text-primary hover:underline">our contact page</a>.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}

