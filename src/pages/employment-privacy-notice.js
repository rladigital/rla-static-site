import React from "react";
import { Row, Column } from "rla-components";

import { colors, spacing } from "../theme/theme";
import HeaderBlock from "../components/HeaderBlock";
import PageDetailContainer from "../components/PageDetailContainer";

export default class EmploymentPrivacyPage extends React.Component {
    componentDidMount() {
        setTimeout(() => {
            window.dispatchEvent(new Event("load"));
        }, 0);
    }
    render() {
        const { transition } = this.props;
        return (
            <div style={transition && transition.style}>
                <PageDetailContainer>
                    <Row>
                        <Column>
                            <HeaderBlock
                                textAlign="left"
                                baseColor={colors.background}
                                fontSize={3}
                                padding={{
                                    top: 0.6,
                                    right: 0,
                                    bottom: 2.4,
                                    left: 0
                                }}
                            >
                                <span>Employment </span>Privacy Notice
                            </HeaderBlock>
                        </Column>
                    </Row>

                    <Row>
                        <Column>
                            <h3>What is the purpose of this document?</h3>
                            <p>RLA Group Ltd is committed to protecting the privacy and security of your personal information.</p>
                            <p>This privacy notice describes how we collect and use personal information about you during and after your working relationship with us, in accordance with the General Data Protection Regulation (GDPR).</p>
                            <p>It applies to all employees, workers and contractors.</p>
                            <p>RLA Group Ltd is a "data controller". This means that we are responsible for deciding how we hold and use personal information about you. We are required under data protection legislation to notify you of the information contained in this privacy notice.</p>
                            <p>This notice applies to current and former employees, workers and contractors. This notice does not form part of any contract of employment or other contract to provide services. We may update this notice at any time.</p>
                            <p>It is important that you read this notice, together with any other privacy notice we may provide on specific occasions when we are collecting or processing personal information about you, so that you are aware of how and why we are using such information.</p>

                            <h3>The kind of information we hold about you</h3>
                            <p>Personal data, or personal information, means any information about an individual from which that person can be identified. It does not include data where the identity has been removed (anonymous data).</p>
                            <p>There are "special categories" of more sensitive personal data which require a higher level of protection.</p>
                            <p>We will collect, store, and use the following categories of personal information about you:</p>
                            <p>Personal contact details such as name, title, addresses, telephone numbers, and personal email addresses; date of birth; gender; marital status and dependants; next of kin and emergency contact information; national Insurance number; bank account details, payroll records and tax status information; current salary and history, annual leave, pension and benefits information; start date; location of employment or workplace; copy of driving licence; recruitment information (including copies of right to work documentation, references and other information included in a CV or cover letter or as part of the application process); employment records (including job titles, work history, working hours, training records and professional memberships); performance, disciplinary and grievance information; CCTV footage and office entry system information; photographs.</p>

                            <p>We may also collect, store and use the following "special categories" of more sensitive personal information:</p>
                            <p>Information about your race or ethnicity, religious beliefs, sexual orientation and political opinions; information about your health, including any medical condition, health and sickness records.</p>

                            <h3>How is your personal information collected?</h3>
                            <p>We collect personal information about employees, workers and contactors through the application and recruitment process, either directly from candidates or sometimes from an employment agency or background check provider. We may sometimes collect additional information from third parties including former employers.</p>
                            <p>We will collect additional personal information in the course of job-related activities throughout the period of you working for us.</p>

                            <h3>How we will use information about you</h3>
                            <p>We will only use your personal information when the law allows us to. Most commonly, we will use your personal information in the following circumstances:</p>
                            <ol>
                                <li>Where we need to perform the contract we have entered into with you.</li>
                                <li>Where we need to comply with a legal obligation.</li>
                                <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                            </ol>

                            <p>We may also use your personal information in the following situations, which are likely to be rare:</p>
                            <ol>
                                <li>Where we need to protect your interests (or someone else's interests).</li>
                                <li>Where it is needed in the public interest.</li>
                            </ol>

                            <h3>Situations in which we will use your personal information</h3>
                            <p>We need all the categories of information in the list above primarily to allow us to perform our contract with you and to enable us to comply with legal obligations. In some cases, we may use your personal information to pursue legitimate interests of our own or those of third parties, provided your interests and fundamental rights do not override those interests. The situations in which we will process your personal information are listed below.</p>
                            <p>Making a decision about your recruitment or appointment; determining the terms on which you work for us; checking you are legally entitled to work in the UK; paying you and, if you are an employee, deducting tax and National Insurance contributions; providing benefits to you; administering the contract we have entered into with you; business management and planning, including accounting and auditing; conducting performance reviews, managing performance or capability and determining performance requirements; making decisions about salary reviews and compensation; gathering evidence for possible grievance or disciplinary hearings; making decisions about your continued employment or engagement; education, training and development requirements; dealing with legal disputes involving you, or other employees, workers and contractors, including accidents at work; managing sickness absence; complying with health and safety obligations; to prevent fraud; to monitor your use of our information and communication systems to ensure compliance with our IT policies; to conduct data analytics studies to review and better understand employee retention and attrition rates; equal opportunities monitoring.</p>

                            <h3>If you fail to provide personal information</h3>
                            <p>If you fail to provide certain information when requested, we may not be able to perform the contract we have entered into with you (such as paying you or providing a benefit), or we may be prevented from complying with our legal obligations (such as to ensure the health and safety of our workers).</p>

                            <h3>Change of purpose</h3>
                            <p>We will only use your personal information for the purposes for which we collected it, unless we reasonably consider that we need to use it for another reason and that reason is compatible with the original purpose. If we need to use your personal information for an unrelated purpose, we will notify you and we will explain the legal basis which allows us to do so.</p>
                            <p>Please note that we may process your personal information without your knowledge or consent, in compliance with the above rules, where this is required or permitted by law.</p>

                            <h3>Do we need your consent?</h3>
                            <p>We do not need your consent if we use special categories of your personal information in accordance with our written policy to carry out our legal obligations or exercise specific rights in the field of employment law. In limited circumstances, we may approach you for your written consent to allow us to process certain particularly sensitive data. If we do so, we will provide you with full details of the information that we would like and the reason we need it, so that you can carefully consider whether you wish to consent. You should be aware that it is not a condition of your contract with us that you agree to any request for consent from us.</p>

                            <h3>Automated decision-making</h3>
                            <p>You will not be subject to decisions that will have a significant impact on you based solely on automated decision-making, unless we have a lawful basis for doing so and we have notified you.</p>

                            <h3>Data sharing</h3>
                            <p>We may have to share your data with third parties, including third-party service providers and other entities in the group.</p>
                            <p>We require third parties to respect the security of your data and to treat it in accordance with the law.</p>
                            <p>We may transfer your personal information outside the EU. If we do, you can expect a similar degree of protection in respect of your personal information.</p>

                            <h3>Data security</h3>
                            <p>We have put in place measures to protect the security of your information. Details of these measures are available upon request.</p>
                            <p>Third parties will only process your personal information on our instructions and where they have agreed to treat the information confidentially and to keep it secure.</p>
                            <p>We have put in place appropriate security measures to prevent your personal information from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed. In addition, we limit access to your personal information to those employees, agents, contractors and other third parties who have a business need to know. They will only process your personal information on our instructions and they are subject to a duty of confidentiality.</p>
                            <p>We have put in place procedures to deal with any suspected data security breach and will notify you and any applicable regulator of a suspected breach where we are legally required to do so.</p>

                            <h3>Data retention</h3>
                            <p>We will only retain your personal information for as long as necessary to fulfil the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements. To determine the appropriate retention period for personal data, we consider the amount, nature, and sensitivity of the personal data, the potential risk of harm from unauthorised use or disclosure of your personal data, the purposes for which we process your personal data and whether we can achieve those purposes through other means, and the applicable legal requirements.</p>
                            <p>In some circumstances we may anonymise your personal information so that it can no longer be associated with you, in which case we may use such information without further notice to you. Once you are no longer an employee, worker or contractor of the company we will retain and securely destroy your personal information in accordance with applicable laws and regulations.</p>

                            <h3>Your duty to inform us of changes</h3>
                            <p>It is important that the personal information we hold about you is accurate and current. Please keep us informed if your personal information changes during your working relationship with us.</p>

                            <h3>Your rights in connection with personal information</h3>
                            <p>Under certain circumstances, by law you have the right to:</p>
                                <ol>
                                    <li>Request access to your personal information (commonly known as a "data subject access request"). This enables you to receive a copy of the personal information we hold about you and to check that we are lawfully processing it.</li>
                                    <li>Request correction of the personal information that we hold about you. This enables you to have any incomplete or inaccurate information we hold about you corrected.</li>
                                    <li>Request erasure of your personal information. This enables you to ask us to delete or remove personal information where there is no good reason for us continuing to process it. You also have the right to ask us to delete or remove your personal information where you have exercised your right to object to processing (see below).</li>
                                    <li>Object to processing of your personal information where we are relying on a legitimate interest (or those of a third party) and there is something about your particular situation which makes you want to object to processing on this ground. You also have the right to object where we are processing your personal information for direct marketing purposes.</li>
                                    <li>Request the restriction of processing of your personal information. This enables you to ask us to suspend the processing of personal information about you, for example if you want us to establish its accuracy or the reason for processing it.</li>
                                    <li>Request the transfer of your personal information to another party.</li>
                                </ol>

                            <h3>Right to withdraw consent</h3>
                            <p>In the limited circumstances where you may have provided your consent to the collection, processing and transfer of your personal information for a specific purpose, you have the right to withdraw your consent for that specific processing at any time. To withdraw your consent, please contact your local data privacy representative. Once we have received notification that you have withdrawn your consent, we will no longer process your information for the purpose or purposes you originally agreed to, unless we have another legitimate basis for doing so in law.</p>

                            <h3>Data protection officer</h3>
                            <p>We have appointed a data protection officer (DPO) to oversee compliance with this privacy notice. If you have any questions about this privacy notice or how we handle your personal information, please contact the Business’s Data Privacy Representative or the DPO, Head of Mission IT: msolomon@themission.co.uk. You have the right to make a complaint at any time to the Information Commissioner's Office (ICO), the UK supervisory authority for data protection issues.</p>

                            <h3>Changes to this privacy notice</h3>
                            <p>We reserve the right to update this privacy notice at any time, and we will provide you with a new privacy notice when we make any substantial updates. We may also notify you in other ways from time to time about the processing of your personal information.</p>

                        </Column>
                    </Row>
                </PageDetailContainer>
            </div>
        );
    }
}
