import { ScrollRestoration } from 'react-router-dom';

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen pt-32 py-12 px-6 md:px-20">
            <div className="bg-white shadow-md rounded-lg p-8 mx-auto">
                <h1 className="text-3xl font-bold text-primary mb-6">Privacy Policy - TalentGrow Academy</h1>

                <div className="space-y-4 text-gray-700">
                    <p>
                        At **TalentGrow Academy**, we are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Privacy Policy outlines the types of personal information we collect, how we use it, and how we protect it.
                    </p>

                    <h2 className="text-2xl font-semibold text-secondary mt-6">1. Information We Collect</h2>
                    <p>
                        We collect the following types of information when you use our services:
                    </p>
                    <ul className="list-inside list-disc">
                        <li><strong>Personal Information:</strong> When you register or use our platform, we may collect personal details such as your name, email address, phone number, and payment details.</li>
                        <li><strong>Usage Data:</strong> We may collect data about how you interact with our platform, such as session data, device information, and IP address.</li>
                        <li><strong>Cookies and Tracking Technologies:</strong> We use cookies and other tracking technologies to improve the functionality of our platform and provide a better user experience.</li>
                    </ul>

                    <h2 className="text-2xl font-semibold text-secondary mt-6">2. How We Use Your Information</h2>
                    <p>
                        The information we collect is used for the following purposes:
                    </p>
                    <ul className="list-inside list-disc">
                        <li><strong>Account Management:</strong> To create and manage your account, process payments, and provide you with access to our courses and services.</li>
                        <li><strong>Customer Support:</strong> To respond to your inquiries and provide technical or customer support.</li>
                        <li><strong>Marketing and Communications:</strong> To send you updates, promotional offers, and information related to our courses and services. You can opt-out of marketing emails at any time.</li>
                        <li><strong>Improvement of Services:</strong> To analyze usage patterns and improve the content and functionality of our platform.</li>
                    </ul>

                    <h2 className="text-2xl font-semibold text-secondary mt-6">3. Data Sharing and Disclosure</h2>
                    <p>
                        **TalentGrow Academy** will not share, sell, or rent your personal information to third parties except in the following cases:
                    </p>
                    <ul className="list-inside list-disc">
                        <li><strong>With Service Providers:</strong> We may share your information with trusted service providers who help us operate our platform, such as payment processors, email marketing services, and hosting providers.</li>
                        <li><strong>Legal Compliance:</strong> If required by law, we may disclose your information to government authorities or law enforcement agencies.</li>
                        <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of our assets, your personal information may be transferred to the new owner.</li>
                    </ul>

                    <h2 className="text-2xl font-semibold text-secondary mt-6">4. Data Security</h2>
                    <p>
                        We implement various security measures to protect your personal information. These measures include encryption, secure servers, and access controls to prevent unauthorized access, alteration, or disclosure of your data.
                    </p>
                    <p>
                        However, please be aware that no method of data transmission over the internet is 100% secure. While we strive to protect your information, we cannot guarantee its absolute security.
                    </p>

                    <h2 className="text-2xl font-semibold text-secondary mt-6">5. Your Rights and Choices</h2>
                    <p>
                        As a user of **TalentGrow Academy**, you have the following rights regarding your personal data:
                    </p>
                    <ul className="list-inside list-disc">
                        <li><strong>Access and Correction:</strong> You can request access to the personal data we hold about you and request corrections if the information is inaccurate.</li>
                        <li><strong>Deletion:</strong> You can request the deletion of your personal data, subject to certain conditions (e.g., if required for legal compliance).</li>
                        <li><strong>Opt-out of Marketing:</strong> You can opt-out of receiving marketing communications by clicking the &quot;unsubscribe&quot; link in our emails.</li>
                        <li><strong>Cookie Preferences:</strong> You can manage your cookie preferences through your browser settings or through our cookie management tool.</li>
                    </ul>

                    <h2 className="text-2xl font-semibold text-secondary mt-6">6. Children&apos;s Privacy</h2>
                    <p>
                        **TalentGrow Academy** does not knowingly collect or solicit personal information from children under the age of 18. If we learn that we have collected personal information from a child under 18, we will take steps to delete such information as quickly as possible.
                    </p>

                    <h2 className="text-2xl font-semibold text-secondary mt-6">7. Changes to This Privacy Policy</h2>
                    <p>
                        We may update this Privacy Policy from time to time. When we make changes, we will update the "Last Updated" date at the top of this page. We encourage you to review this policy periodically to stay informed about how we are protecting your information.
                    </p>

                    <h2 className="text-2xl font-semibold text-secondary mt-6">8. Contact Us</h2>
                    <p>
                        If you have any questions or concerns about this Privacy Policy, or if you wish to exercise your rights regarding your personal data, please contact us at:
                    </p>
                    <p>
                        <strong>Email:</strong> <a href="mailto:support@talentgrowacademy.com" className="text-blue-500 hover:underline">support@talentgrowacademy.com</a>
                    </p>
                </div>
            </div>
            <ScrollRestoration />
        </div>
    );
};

export default PrivacyPolicy;
