
import { ScrollRestoration } from 'react-router-dom';

const TermsCondition = () => {
    return (
        <div className="min-h-screen pt-32 py-12 px-6 md:px-20">
            <div className="bg-white shadow-md rounded-lg p-8 mx-auto">
                <h1 className="text-3xl font-bold text-primary mb-6">Terms and Conditions - TalentGrow Academy</h1>

                <div className="space-y-4 text-gray-700">
                    <p>
                        <strong>Age Requirement:</strong> Applicants must be at least 18 years old to join **TalentGrow Academy** as an online part-time student. Those under 18 can apply but will only be eligible for learning and earning programs.
                    </p>
                    <p>
                        <strong>Training Period:</strong> All applicants must undergo a six-month training period before receiving certification for online part-time work from **TalentGrow Academy**.
                    </p>

                    <p>
                        <strong>Admission Fees:</strong> A non-refundable admission fee is required for enrollment in **TalentGrow Academy**. This fee secures your spot in the program and provides access to valuable learning and earning opportunities.
                    </p>

                    <p>
                        <strong>Social Media Profile:</strong> A steady social media presence is necessary as it plays a crucial role in **TalentGrow Academy&apos;s** operations and goodwill promotion.
                    </p>

                    <p>
                        <strong>Course Design:</strong> Courses are tailored by **TalentGrow Academy** to align with work requirements, focusing on value addition and revenue generation.
                    </p>

                    <p>
                        <strong>Points System:</strong> Points may be awarded to encourage learning, but these points are subject to change based on **TalentGrow Academy&apos;s** needs.
                    </p>

                    <p>
                        <strong>Refund Policy:</strong> If dissatisfied, applicants can claim a refund within three days of admission by emailing <a href="mailto:talentgrowacademy@gmail.com" className="text-blue-500 hover:underline">talentgrowacademy@gmail.com</a>. Refunds are only considered if misleading information or lack of interest in learning is cited.
                    </p>

                    <p>
                        <strong>Code of Conduct:</strong> Students engaging in unauthorized work proposals, misbehavior, or misconduct will face immediate deactivation without prior notice by **TalentGrow Academy**.
                    </p>

                    <p>
                        <strong>Nature of Work:</strong> **TalentGrow Academy** provides online marketing skills and supports additional earnings, but this is not a long-term job commitment.
                    </p>

                    <h2 className="text-2xl font-semibold text-secondary mt-8">Terms for TalentGrow Academy Meet App</h2>

                    <p>
                        The **TalentGrow Academy Meet App** facilitates consultant meetings, live classes, training, and support sessions. It requires access to files, camera, microphone, and Picture-in-Picture mode.
                    </p>

                    <p>
                        <strong>Data Privacy:</strong> The app does not collect or share personal information.
                    </p>

                    <p>
                        <strong>Behavior in Meetings:</strong> Misbehavior during meetings will result in immediate removal and account deactivation by **TalentGrow Academy**.
                    </p>

                    <p>
                        <strong>Moderation:</strong> Only **TalentGrow Academy** sub-admins can access moderator functions in the app.
                    </p>
                </div>
            </div>
            <ScrollRestoration />
        </div>
    );
};

export default TermsCondition;
