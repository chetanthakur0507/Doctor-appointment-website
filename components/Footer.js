import Link from "next/link";

const Footer = () => {
  const footerIcons = [
    { icon: `<i class="fa-brands fa-twitter"></i>`, href: "" },
    { icon: `<i class="fa-brands fa-facebook"></i>`, href: "" },
    { icon: `<i class="fa-brands fa-instagram"></i>`, href: "" },
    { icon: `<i class="fa-brands fa-skype"></i>`, href: "" },
    { icon: `<i class="fa-brands fa-linkedin"></i>`, href: "" },
  ];
  return (
    <>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-1 justify-between items-center bg-sky-50/60 shadow-[inset_0_1px_2px_2px_#e2e1e1] text-sm px-2 sm:px-10 lg:px-20 py-8">
        <div>
          <p>
            &copy; Copyright <span className="font-bold">.$chetan</span> All
            Rights Reserved
          </p>
          <p className="sm:text-start text-center">
            Developed by{" "}
            <Link
              className="font-semibold text-blue-400 hover:underline underline-offset-2"
              href="https://github.com/chetanthakur0507"
              target="_blank"
            >
              ChetanThakur
            </Link>
            .
          </p>
        </div>
        <div className="flex justify-between items-center gap-3">
          {footerIcons.map((item, index) => (
            <FooterIcon key={index} icon={item.icon} href={item.href} />
          ))}
        </div>
      </div>
    </>
  );
};

const FooterIcon = (props) => {
  return (
    <>
      <Link
        className="rounded-full bg-blue-500 px-3 py-2 text-white"
        href={props.href}
        dangerouslySetInnerHTML={{ __html: props.icon }}
      ></Link>
    </>
  );
};

export default Footer;
