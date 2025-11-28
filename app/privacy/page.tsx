import { MainNav } from "@/components/navigation/main-nav"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <MainNav />
      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight mb-8">Privacy Policy</h1>
          
          <div className="prose prose-sm max-w-none space-y-6">
            <section>
              <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
              <p className="text-muted-foreground">
                Faithcal (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you 
                visit our website and use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Personal Information</h3>
                  <p className="text-muted-foreground">
                    We may collect personal information that you voluntarily provide to us when you register for an 
                    account, post events, or contact us. This may include:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground ml-4 space-y-1">
                    <li>Name and email address</li>
                    <li>Payment information (processed securely through Stripe)</li>
                    <li>Event information and media files</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Automatically Collected Information</h3>
                  <p className="text-muted-foreground">
                    We automatically collect certain information when you visit our website, including:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground ml-4 space-y-1">
                    <li>IP address and browser type</li>
                    <li>Pages visited and time spent on pages</li>
                    <li>Device information</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
              <p className="text-muted-foreground mb-2">We use the information we collect to:</p>
              <ul className="list-disc list-inside text-muted-foreground ml-4 space-y-1">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Send you technical notices and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Monitor and analyze usage patterns</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Information Sharing</h2>
              <p className="text-muted-foreground">
                We do not sell, trade, or rent your personal information to third parties. We may share your 
                information only in the following circumstances:
              </p>
              <ul className="list-disc list-inside text-muted-foreground ml-4 space-y-1">
                <li>With service providers who assist us in operating our website</li>
                <li>When required by law or to protect our rights</li>
                <li>With your consent</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
              <p className="text-muted-foreground">
                We implement appropriate technical and organizational security measures to protect your personal 
                information. However, no method of transmission over the Internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
              <p className="text-muted-foreground mb-2">You have the right to:</p>
              <ul className="list-disc list-inside text-muted-foreground ml-4 space-y-1">
                <li>Access and receive a copy of your personal data</li>
                <li>Rectify inaccurate personal data</li>
                <li>Request deletion of your personal data</li>
                <li>Object to processing of your personal data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <p className="text-muted-foreground">
                If you have questions about this Privacy Policy, please contact us at{" "}
                <a href="/contact" className="text-primary hover:underline">our contact page</a>.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}

