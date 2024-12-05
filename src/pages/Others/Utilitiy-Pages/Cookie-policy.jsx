import { ScrollRestoration } from 'react-router-dom';

const CookiePolicy = () => {
    return (
        <div className="min-h-screen pt-32 py-12 px-6 md:px-20">
            <div className="bg-white shadow-md rounded-lg p-8  mx-auto">
                <h1 className="text-3xl font-bold text-primary mb-6">Cookie Policy - TalentGrow Academy</h1>

                <div className="space-y-4 text-gray-700">
                    <p>
                        At **TalentGrow Academy**, we use cookies to improve your browsing experience and provide personalized services. This Cookie Policy explains what cookies are, how we use them, and how you can manage your cookie preferences.
                    </p>

                    <h2 className="text-2xl font-semibold text-secondary mt-6">1. What Are Cookies?</h2>
                    <p>
                        Cookies are small text files that are placed on your device when you visit a website. They are commonly used to make websites work more efficiently and to provide information to the site owner. Cookies allow us to collect information about your preferences and interactions with our website to improve your user experience.
                    </p>

                    <h2 className="text-2xl font-semibold text-secondary mt-6">2. Types of Cookies We Use</h2>
                    <p>
                        We use the following types of cookies on our website:
                    </p>
                    <ul className="list-inside list-disc">
                        <li><strong>Essential Cookies:</strong> These cookies are necessary for the basic functionality of the website and cannot be turned off in our systems. They are usually only set in response to actions you take, such as logging in or filling out forms.</li>
                        <li><strong>Performance Cookies:</strong> These cookies collect information about how you use our website, such as which pages are visited most often. They help us improve the performance of our website and optimize its functionality.</li>
                        <li><strong>Functionality Cookies:</strong> These cookies allow us to remember your preferences, such as language or region, to provide a more personalized experience.</li>
                        <li><strong>Advertising Cookies:</strong> These cookies are used to deliver relevant advertisements to you. They track your browsing behavior across different websites and are often used by third-party advertisers.</li>
                    </ul>

                    <h2 className="text-2xl font-semibold text-secondary mt-6">3. How We Use Cookies</h2>
                    <p>
                        We use cookies for the following purposes:
                    </p>
                    <ul className="list-inside list-disc">
                        <li><strong>To Enhance User Experience:</strong> Cookies help us provide a better, more personalized experience by remembering your preferences and settings.</li>
                        <li><strong>To Analyze Website Traffic:</strong> We use cookies to track website usage and analyze user behavior in order to improve our website&apos;s performance and usability.</li>
                        <li><strong>To Serve Relevant Advertisements:</strong> Advertising cookies help us show you ads that are relevant to your interests, both on our website and across other websites.</li>
                        <li><strong>To Provide Social Media Features:</strong> Some cookies enable the integration of social media platforms, allowing you to share content from our website directly to your social media accounts.</li>
                    </ul>

                    <h2 className="text-2xl font-semibold text-secondary mt-6">4. Managing Your Cookie Preferences</h2>
                    <p>
                        You have the right to accept or reject cookies when you visit our website. You can manage your cookie preferences by:
                    </p>
                    <ul className="list-inside list-disc">
                        <li><strong>Cookie Settings:</strong> You can adjust your browser settings to accept or reject cookies. Most browsers allow you to block or delete cookies, and you can adjust your preferences in the browser&apos;s settings menu.</li>
                        <li><strong>Opting-Out of Advertising Cookies:</strong> You can opt-out of targeted advertising cookies by visiting the following links: <a href="https://www.aboutads.info/choices" className="text-blue-500 hover:underline">AdChoices</a> and <a href="https://optout.networkadvertising.org" className="text-blue-500 hover:underline">Network Advertising Initiative</a>.</li>
                        <li><strong>Clearing Your Browser Cookies:</strong> You can clear cookies from your browser at any time. This may impact your experience on our website, such as remembering your preferences.</li>
                    </ul>

                    <h2 className="text-2xl font-semibold text-secondary mt-6">5. Third-Party Cookies</h2>
                    <p>
                        Some of the cookies used on our website are set by third-party services such as analytics tools, advertising networks, and social media platforms. These third-party services may use cookies to track your online activities across different websites and provide you with targeted advertising or social media features.
                    </p>

                    <h2 className="text-2xl font-semibold text-secondary mt-6">6. How We Protect Your Information</h2>
                    <p>
                        While cookies help us provide better services, we take your privacy seriously. We use appropriate technical and organizational measures to protect your personal data from unauthorized access, use, or disclosure. However, please note that no method of data transmission over the internet is completely secure, and we cannot guarantee the absolute security of your information.
                    </p>

                    <h2 className="text-2xl font-semibold text-secondary mt-6">7. Changes to This Cookie Policy</h2>
                    <p>
                        We may update this Cookie Policy from time to time. When we make changes, we will update the &quot;Last Updated&quot; date at the top of this page. We encourage you to review this policy periodically to stay informed about how we use cookies and how you can manage your preferences.
                    </p>

                    <h2 className="text-2xl font-semibold text-secondary mt-6">8. Contact Us</h2>
                    <p>
                        If you have any questions or concerns about this Cookie Policy, or if you wish to exercise your rights regarding cookies, please contact us at:
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

export default CookiePolicy;
