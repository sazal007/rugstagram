"use client";

import { motion, Variants } from "motion/react";
import { sanitizeHtmlContent } from "@/utils/htmlSanitizer";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const TERMS_SECTIONS = [
  {
    title: "Introduction",
    content: `
      <p>
        By visiting this website, you unconditionally agree with our terms and
        conditions. We have the right to reassess or review these terms and
        conditions at any time at our sole discretion. Each purchase made
        through the services of this website shall be subject to these
        Online Shopping Terms and Conditions. This site is possessed and
        operated by Rugkala. The domain name www.rugkala.com i.e. the
        website is registered in the name of Rugkala, an incorporated
        organization with its registered office at Bouddha, Kathmandu,
        Nepal.
      </p>
    `,
  },
  {
    title: "Product Visual Discrepancies",
    content: `
      <p>
        We are making every possible effort to produce our products as
        perfectly as possible. What you will observe on the website is a
        view that results in the discrepancy of every computer screen - like
        colors, shades, textures, sizes and appearances etc. A customer may
        request photographs of products other than the ones displayed online
        by email at shop@rugkala.com.
      </p>
    `,
  },
  {
    title: "Website Copyright",
    content: `
      <p>
        The website is specifically designed and protected by copyright.
        Imitation in any form is strictly forbidden. Rugkala holds all
        social media posted by the company on Google Plus, Facebook,
        Twitter, YouTube, Pinterest and Instagram under its copyright act.
      </p>
      <p>
        Action must be taken as per jurisdiction of the courts of Nepal for
        any kind of plagiarism. Prices of all premium quality carpets are
        stated on our site and we acknowledge your order by contacting you
        with an order confirmation via email.
      </p>
      <p>
        Our website might have links to third party sites that we are not
        responsible for. We hold no responsibility and accountability for
        the material posted on these third-party websites.
      </p>
    `,
  },
  {
    title: "Prohibited Activities",
    content: `
      <p>
        You shall not upload, show, host, alter, circulate, transfer,
        inform, list or share unrightfully any piece of information that:
      </p>
      <ul class="list-disc pl-5 space-y-2 mt-2">
        <li> is a property of someone other than you.</li>
        <li>
          is unacceptably damaging, troublesome, improper, offensive,
          lewd, pornographic, paedophilic, slanderous, intrusive of one's
          privacy, detestable, or culturally, nationally disagreeable,
          weary, connecting or boosting money betting or laundering and
          illegitimate activity of all nature.
        </li>
        <li> hurting minors.</li>
        <li>
          encroaching patents, trademarks, copyrights and other
          exclusive rights.
        </li>
        <li> violation of any law for the time being in force.</li>
        <li>
          misinforming recipients and communicating information that is
          totally attacking or foreboding in nature.
        </li>
        <li> personate another individual.</li>
        <li>
          comprising software virus or any other computer code, files or
          programs premeditated to disturb, abolish or bound the function of
          any computer resource.
        </li>
        <li>
          intimidating the harmony, honour, shield, safety or
          sovereignty of Nepal, welcoming associations with states overseas,
          provocation to any crime, preventing investigation of any offence
          or is belittling any other country.
        </li>
        <li>
          You shall not craft obligation for us or be the reason behind
          our failure (entirely or partially) of the services of ISPs or
          other suppliers.
        </li>
      </ul>
    `,
  },
  {
    title: "Credit/Debit Card Particulars",
    content: `
      <p>
        You understand, approve and confirm the accuracy of credit/debit
        card details provided by you for using our services on our website.
        Credit cards should be your own and should include correct and valid
        details. The info given by you will neither be used nor shared by us
        with any third party unless necessary for scam proofs by the law’s
        guideline or order of the court. We cannot be held responsible for
        any credit card fraud. You will be responsible for potential credit
        card fraud. The duty to prove wrong doing shall be solely on you.
      </p>
    `,
  },
  {
    title: "Trademarks",
    content: `
      <p>
        Trademarks, logos and service marks shown on the website are our
        possessions. You are forbidden to use any mark for any purpose
        without the prior written permission from us or the third party. All
        of the information and content together with any software program on
        our website is secured by copyright. Users cannot transform,
        duplicate, dispense, spread, show, circulate, vend, certify or
        generate unoriginal work by using any existing content on our
        website for marketable or community purposes.
      </p>
    `,
  },
  {
    title: "Arbitration",
    content: `
      <p>
        In the situation of any legal issue between the company and the
        customer over the course of individual use of the website in
        association with rationality, interpretation, execution or purported
        breach of any provision of this agreement including the privacy
        policies and documents incorporated through reference, the dispute
        shall be mentioned to a sole arbitrator who will be an independent
        and neutral third party acknowledged by the Company. The location of
        arbitration will be Kathmandu and the relevant arbitration laws of
        Nepal shall administer the arbitration proceedings. The proceedings
        shall be in the English language.
      </p>
    `,
  },
  {
    title: "Governing Law",
    content: `
      <p>
        The agreement and privacy policy of documents incorporated by
        reference will be administrated and interpreted in accordance with
        the laws of Nepal by exclusive jurisdiction conferred in the courts
        in Kathmandu.
      </p>
    `,
  },
];

const Section: React.FC<{ title: string; content: string }> = ({
  title,
  content,
}) => (
  <div className="mb-10">
    <h3 className="text-3xl font-bold font-serif mb-4 text-primary">{title}</h3>
    <div
      className="text-gray-600 font-serif leading-relaxed space-y-4"
      dangerouslySetInnerHTML={{ __html: sanitizeHtmlContent(content) }}
    />
  </div>
);

export const TermsOfService: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="space-y-12"
      >
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-accent block">
            Legal Information
          </span>
          <h1 className="text-4xl md:text-5xl font-serif leading-tight">
            Terms & Conditions
          </h1>
        </div>

        {TERMS_SECTIONS.map((section, index) => (
          <Section key={index} title={section.title} content={section.content} />
        ))}
      </motion.div>
    </div>
  );
};
