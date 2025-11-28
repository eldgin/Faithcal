import { MainNav } from "@/components/navigation/main-nav"

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <MainNav />
      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight mb-8">Return/Refund Policy</h1>
          
          <div className="prose prose-sm max-w-none space-y-6">
            <section>
              <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Overview</h2>
              <p className="text-muted-foreground">
                At Faithcal, we strive to provide excellent service. This policy outlines our refund 
                and return procedures for premium subscriptions and prime placement purchases.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Premium Subscriptions</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Monthly Subscriptions</h3>
                  <p className="text-muted-foreground">
                    Premium subscriptions are billed monthly and automatically renew. You may cancel 
                    your subscription at any time through your dashboard. Cancellation will take effect 
                    at the end of your current billing period.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Refund Eligibility</h3>
                  <p className="text-muted-foreground mb-2">
                    Refunds for premium subscriptions may be issued in the following circumstances:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground ml-4 space-y-1">
                    <li>Within 7 days of initial subscription purchase</li>
                    <li>If service is unavailable for more than 48 hours</li>
                    <li>If there is a billing error on our part</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Non-Refundable</h3>
                  <p className="text-muted-foreground">
                    Refunds will not be issued for subscriptions cancelled after the 7-day period, 
                    or if the cancellation is due to violation of our Terms and Conditions.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Prime Placement Purchases</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Refund Policy</h3>
                  <p className="text-muted-foreground">
                    Prime placement purchases are generally non-refundable once the placement has been 
                    activated. However, refunds may be considered in exceptional circumstances:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground ml-4 space-y-1">
                    <li>If placement fails to activate due to technical issues on our end</li>
                    <li>If the event is cancelled before the placement period begins</li>
                    <li>If there is a billing error</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Partial Refunds</h3>
                  <p className="text-muted-foreground">
                    Partial refunds may be issued if placement is removed early due to policy violations 
                    or at our discretion.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Refund Process</h2>
              <p className="text-muted-foreground mb-2">To request a refund:</p>
              <ol className="list-decimal list-inside text-muted-foreground ml-4 space-y-1">
                <li>Contact us through our <a href="/contact" className="text-primary hover:underline">contact page</a></li>
                <li>Provide your account information and reason for refund</li>
                <li>We will review your request within 5-7 business days</li>
                <li>If approved, refunds will be processed to your original payment method within 10-14 business days</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Cancellation</h2>
              <p className="text-muted-foreground">
                You may cancel your premium subscription at any time through your dashboard. 
                Cancellation will prevent future charges but will not refund the current billing period. 
                You will retain access to premium features until the end of your current billing cycle.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Disputes</h2>
              <p className="text-muted-foreground">
                If you have a dispute regarding a charge, please contact us immediately. We will work 
                with you to resolve any billing issues in a timely manner.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <p className="text-muted-foreground">
                For questions about refunds or to request a refund, please visit our{" "}
                <a href="/contact" className="text-primary hover:underline">contact page</a>.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}

