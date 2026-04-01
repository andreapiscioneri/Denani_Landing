declare module "html2pdf.js" {
  type Html2PdfOptions = {
    margin?: number | number[];
    filename?: string;
    image?: { type?: string; quality?: number };
    html2canvas?: Record<string, unknown>;
    jsPDF?: Record<string, unknown>;
    pagebreak?: Record<string, unknown>;
  };

  type Html2PdfChain = {
    set: (options: Html2PdfOptions) => Html2PdfChain;
    from: (source: HTMLElement) => Html2PdfChain;
    save: () => Promise<void>;
  };

  const html2pdf: () => Html2PdfChain;
  export default html2pdf;
}
