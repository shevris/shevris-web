import type { Metadata } from "next";
import {
  ArrowUpRight,
  BadgeCheck,
  LockKeyhole,
  PackageX,
  PhoneOff,
  Scale,
  Timer,
  Truck,
} from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Reveal } from "@/components/reveal";
import {
  btnPrimary,
  container,
  sectionLabel,
  sectionSub,
  sectionWrap,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "شاورس ٹیکنالوجیز — تجارت کے لیے سافٹ ویئر",
  description:
    "شاورس ٹیکنالوجیز لاہور کی ایک آزاد سافٹ ویئر کمپنی ہے — تجارت کے نام سے پاکستان کی اپنی مارکیٹ پلیس بنا رہی ہے۔",
  alternates: {
    canonical: "/ur",
    languages: { "en-PK": "/", ur: "/ur" },
  },
};

const PROBLEMS = [
  {
    icon: PackageX,
    complaint: "برانڈڈ چیز منگوائی، ڈبے سے سستی نقل نکلی۔",
    fix: "ہر پارسل پلیٹ فارم سے بک ہوتا ہے",
    detail:
      "بیچنے والا ریکارڈ سے باہر کوئی صندوق نہیں بھیج سکتا۔ ہر تجارت آرڈر ٹریک شدہ کنزائنمنٹ کے ذریعے جاتا ہے — جو پہنچے وہ وہی ہو جو آپ نے منگوایا۔",
  },
  {
    icon: PhoneOff,
    complaint: "بیچنے والے کو میرا پتہ ملا، پھر جعلی COD پارسل بھیج دیا۔",
    fix: "آپ کی رابطہ تفصیلات پوشیدہ رہتی ہیں",
    detail:
      "بیچنے والے کو صرف آپ کا شہر نظر آتا ہے، فون نہیں۔ کوریئر لیبل سرور سے خودکار بنتا ہے — آپ کا پتہ کوئی پلیٹ فارم سے باہر استعمال نہیں کر سکتا۔",
  },
  {
    icon: Timer,
    complaint: "«ڈیلیور ہو گیا» لکھا آیا، پارسل کبھی نہ پہنچا۔",
    fix: "پیسہ صرف حقیقی ڈیلیوری پر جاری ہوتا ہے",
    detail:
      "آپ کی ادائیگی ایسکرو میں رہتی ہے جب تک کوریئر کے مصدقہ مراحل ڈیلیوری ثابت نہ کریں۔ کسی کے کہنے پر نہیں۔",
  },
  {
    icon: Scale,
    complaint: "بڑے ڈسٹریبیوٹر قیمت طے کرتے ہیں، انصاف پتہ نہیں چلتا۔",
    fix: "اصل لاگت، آمنے سامنے",
    detail:
      "سپلائرز کی آفرز کا موازنہ مکمل رقم پر کریں — مال اور ڈیلیوری مل کر — صرف سرخی کی سستی قیمت پر نہیں۔",
  },
  {
    icon: Truck,
    complaint: "کوریئر نے COD ہفتے پہلے وصول کیا، ادائیگی ابھی تک نہیں آئی۔",
    fix: "ہر قسٹ کا حساب، ہر پارسل تک",
    detail:
      "ہر وصول شدہ پارسل مفاہمت لیجر میں رہتا ہے جب تک کوریئر کی رقم کی تصدیق نہ ہو — پھر آپ کی ادائیگی خودکار طے ہوتی ہے۔",
  },
];

export default function UrduPage() {
  return (
    <PageShell>
      <div dir="rtl" lang="ur">
        {/* Hero */}
        <section className="relative z-[1] py-20 md:py-[110px]">
          <div className={`${container} text-center`}>
            <Reveal>
              <a
                href="https://tijarah.pk"
                target="_blank"
                rel="noopener"
                className="group border-line bg-panel text-muted hover:border-accent mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold tracking-[0.08em] transition-colors"
              >
                <span className="h-[7px] w-[7px] shrink-0 rounded-full bg-[#4ade80]" />
                تجارت ویٹ لسٹ کھل چکی ہے
                <ArrowUpRight size={12} aria-hidden="true" />
              </a>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="text-ink mx-auto max-w-[720px] text-4xl leading-[1.25] font-[750] tracking-[-0.02em] md:text-[56px]">
                آن لائن خریداری جس پر آپ
                <span className="text-accent"> بھروسا </span>
                کر سکیں۔
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-muted mx-auto mt-6 max-w-[560px] text-[17px] leading-relaxed">
                تجارت — پاکستان کی اپنی مارکیٹ پلیس۔ ادائیگی ڈیلیوری کی تصدیق تک
                محفوظ رہتی ہے، ہر پارسل ٹریک شدہ ہوتا ہے، اور دکانداروں کو ہول
                سیل کا بازار ان کی دکان پر ملتا ہے۔
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <a
                  className={btnPrimary}
                  href="https://tijarah.pk"
                  target="_blank"
                  rel="noopener"
                >
                  تجارت ویٹ لسٹ میں شامل ہوں
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Problems */}
        <section className={sectionWrap}>
          <div className={container}>
            <Reveal>
              <div className="mx-auto mb-14 max-w-[720px] text-center">
                <span className={sectionLabel}>حقیقی مسائل</span>
                <h2 className="text-ink mb-4 text-3xl leading-[1.2] font-[750] tracking-[-0.02em] md:text-[42px]">
                  ہر اس شخص نے یہ جھیلا ہے جس نے پاکستان میں آن لائن خریدا یا
                  بیچا۔
                </h2>
                <p className={sectionSub}>
                  یہ کنارے کی باتیں نہیں — یہی شکایات ریویو صفحات بھری پڑی ہیں۔
                  تجارت اس لیے بنائی گئی کہ یہ سب ساختانی طور پر ناممکن ہو۔
                </p>
              </div>
            </Reveal>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {PROBLEMS.map((p, i) => (
                <Reveal
                  key={p.fix}
                  delay={Math.min(i * 0.05, 0.25)}
                  className="h-full"
                >
                  <li className="border-line bg-panel flex h-full flex-col gap-3 rounded-2xl border p-6">
                    <span className="text-accent">
                      <p.icon size={20} aria-hidden="true" />
                    </span>
                    <blockquote className="text-ink text-[14.5px] leading-relaxed font-medium">
                      {p.complaint}
                    </blockquote>
                    <div className="mt-auto">
                      <p className="text-accent text-[13.5px] font-semibold">
                        <BadgeCheck
                          size={14}
                          aria-hidden="true"
                          className="me-1.5 -mt-0.5 inline-block"
                        />
                        {p.fix}
                      </p>
                      <p className="text-muted mt-2 text-[13px] leading-relaxed">
                        {p.detail}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className={sectionWrap}>
          <div className={`${container} text-center`}>
            <Reveal>
              <span className="border-line bg-panel text-accent mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold">
                <LockKeyhole size={13} aria-hidden="true" />
                جلد آ رہا ہے
              </span>
              <h2 className="text-ink mx-auto max-w-[560px] text-3xl leading-[1.2] font-[750] tracking-[-0.02em] md:text-[40px]">
                لانچ والے دن سب سے پہلے آگاہ رہیں۔
              </h2>
              <p className="text-muted mx-auto mt-4 max-w-[480px] text-[15.5px] leading-relaxed">
                ویٹ لسٹ ممبران کو پہلی رسائی ملتی ہے اور ہر سنگِ میل کی خبر سب
                سے پہلے پہنچتی ہے۔
              </p>
              <div className="mt-8 flex justify-center">
                <a
                  className={btnPrimary}
                  href="https://tijarah.pk"
                  target="_blank"
                  rel="noopener"
                >
                  ویٹ لسٹ میں شامل ہوں
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
