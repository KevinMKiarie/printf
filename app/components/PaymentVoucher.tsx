'use client';

import { useState, useRef } from 'react';

interface VoucherData {
  voucherNo: string;
  headOfAccount: string;
  paidTo: string;
  being: string;
  kshs: string;
  preparedBy: string;
  preparedDate: string;
  acCode: string;
  postedBy: string;
  postedDate: string;
  checkedBy: string;
  chequeNo: string;
  bank: string;
  approvedBy: string;
  approvedDate: string;
}

export default function PaymentVoucher() {
  const [formData, setFormData] = useState<VoucherData>({
    voucherNo: '',
    headOfAccount: '',
    paidTo: '',
    being: '',
    kshs: '',
    preparedBy: '',
    preparedDate: '',
    acCode: '',
    postedBy: '',
    postedDate: '',
    checkedBy: '',
    chequeNo: '',
    bank: '',
    approvedBy: '',
    approvedDate: '',
  });

  const printRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (field: keyof VoucherData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePrint = () => {
    const printContent = printRef.current;
    if (!printContent) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Payment Voucher - ${formData.voucherNo || 'New'}</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            @media print {
              @page {
                size: A4 portrait;
                margin: 10mm 15mm;
              }
              body {
                margin: 0;
                padding: 0;
              }
            }
            .voucher-half-page {
              height: auto;
              page-break-after: always;
            }
            @media screen {
              .voucher-half-page {
                max-height: none;
              }
            }
          </style>
        </head>
        <body>
          <div class="voucher-half-page">
            ${printContent.innerHTML}
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  const handleDownload = () => {
    const printContent = printRef.current;
    if (!printContent) return;

    const content = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Payment Voucher - ${formData.voucherNo || 'New'}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @media print {
      @page {
        size: A4 portrait;
        margin: 10mm 15mm;
      }
      body {
        margin: 0;
        padding: 0;
      }
    }
    .voucher-half-page {
      height: auto;
      page-break-after: always;
    }
    @media screen {
      .voucher-half-page {
        max-height: none;
      }
    }
  </style>
</head>
<body>
  <div class="voucher-half-page">
    ${printContent.innerHTML}
  </div>
  <script>
    window.onload = function() {
      setTimeout(() => window.print(), 500);
    }
  </script>
</body>
</html>`;

    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `payment-voucher-${formData.voucherNo || 'new'}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-[95%] mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Payment Voucher Form</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">Fill Form Details</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Voucher No.</label>
                <input
                  type="text"
                  value={formData.voucherNo}
                  onChange={(e) => handleInputChange('voucherNo', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter voucher number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Head of Account</label>
                <input
                  type="text"
                  value={formData.headOfAccount}
                  onChange={(e) => handleInputChange('headOfAccount', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter head of account"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Paid To</label>
                <input
                  type="text"
                  value={formData.paidTo}
                  onChange={(e) => handleInputChange('paidTo', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter payee name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Being</label>
                <textarea
                  value={formData.being}
                  onChange={(e) => handleInputChange('being', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none text-black focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter description"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount (KSHS)</label>
                <input
                  type="text"
                  value={formData.kshs}
                  onChange={(e) => handleInputChange('kshs', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter amount"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prepared By</label>
                  <input
                    type="text"
                    value={formData.preparedBy}
                    onChange={(e) => handleInputChange('preparedBy', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={formData.preparedDate}
                    onChange={(e) => handleInputChange('preparedDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">A/C Code</label>
                <input
                  type="text"
                  value={formData.acCode}
                  onChange={(e) => handleInputChange('acCode', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter account code"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Posted By</label>
                  <input
                    type="text"
                    value={formData.postedBy}
                    onChange={(e) => handleInputChange('postedBy', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={formData.postedDate}
                    onChange={(e) => handleInputChange('postedDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Checked By</label>
                <input
                  type="text"
                  value={formData.checkedBy}
                  onChange={(e) => handleInputChange('checkedBy', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter checker name"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cheque No.</label>
                  <input
                    type="text"
                    value={formData.chequeNo}
                    onChange={(e) => handleInputChange('chequeNo', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Cheque number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bank</label>
                  <input
                    type="text"
                    value={formData.bank}
                    onChange={(e) => handleInputChange('bank', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Bank name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Approved By</label>
                  <input
                    type="text"
                    value={formData.approvedBy}
                    onChange={(e) => handleInputChange('approvedBy', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={formData.approvedDate}
                    onChange={(e) => handleInputChange('approvedDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Print Preview</h2>

              <div ref={printRef} className="border-2 border-black p-4 bg-white overflow-auto">
                <h2 className="text-center text-xl font-bold mb-4 tracking-[4px] text-black">PAYMENT VOUCHER</h2>

                <div className="grid grid-cols-2 gap-4 mb-3 pb-3">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold mb-1 text-gray-600 uppercase tracking-wider">Voucher No.</span>
                    <span className="text-sm py-1 border-b border-gray-800 min-h-7 text-black">{formData.voucherNo || '\u00A0'}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold mb-1 text-gray-600 uppercase tracking-wider">Date</span>
                    <span className="text-sm py-1 border-b border-gray-800 min-h-7 text-black">{formData.preparedDate || '\u00A0'}</span>
                  </div>
                </div>

                <div className="mb-3 pb-3 gap-4 flex flex-col">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold mb-1 text-gray-600 uppercase tracking-wider">Head of Account</span>
                    <span className="text-sm py-1 border-b border-gray-800 min-h-7 text-black">{formData.headOfAccount || '\u00A0'}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold mb-1 text-gray-600 uppercase tracking-wider">Paid To</span>
                    <span className="text-sm py-1 border-b border-gray-800 min-h-7 text-black">{formData.paidTo || '\u00A0'}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold mb-1 text-gray-600 uppercase tracking-wider">Being</span>
                    <span className="text-sm py-2 border-b border-gray-800 min-h-[50px] whitespace-pre-wrap break-words text-black leading-relaxed">{formData.being || '\u00A0'}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-3 pb-3">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold mb-1 text-gray-600 uppercase tracking-wider">KSHS</span>
                    <span className="text-sm py-1 border-b border-gray-800 min-h-7 text-black">{formData.kshs || '\u00A0'}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold mb-1 text-gray-600 uppercase tracking-wider">Cheque No.</span>
                    <span className="text-sm py-1 border-b border-gray-800 min-h-7 text-black">{formData.chequeNo || '\u00A0'}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold mb-1 text-gray-600 uppercase tracking-wider">Bank</span>
                    <span className="text-sm py-1 border-b border-gray-800 min-h-7 text-black">{formData.bank || '\u00A0'}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-3 pb-3">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold mb-1 text-gray-600 uppercase tracking-wider">Prepared By</span>
                    <span className="text-sm py-1 border-b border-gray-800 min-h-7 text-black">{formData.preparedBy || '\u00A0'}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold mb-1 text-gray-600 uppercase tracking-wider">Checked By</span>
                    <span className="text-sm py-1 border-b border-gray-800 min-h-7 text-black">{formData.checkedBy || '\u00A0'}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold mb-1 text-gray-600 uppercase tracking-wider">Approved By</span>
                    <span className="text-sm py-1 border-b border-gray-800 min-h-7 text-black">{formData.approvedBy || '\u00A0'}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-3 pb-3">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold mb-1 text-gray-600 uppercase tracking-wider">Date</span>
                    <span className="text-sm py-1 border-b border-gray-800 min-h-7 text-black">{formData.preparedDate || '\u00A0'}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold mb-1 text-gray-600 uppercase tracking-wider">Date</span>
                    <span className="text-sm py-1 border-b border-gray-800 min-h-7 text-black">{formData.postedDate || '\u00A0'}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold mb-1 text-gray-600 uppercase tracking-wider">Date</span>
                    <span className="text-sm py-1 border-b border-gray-800 min-h-7 text-black">{formData.approvedDate || '\u00A0'}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold mb-1 text-gray-600 uppercase tracking-wider">A/C Code</span>
                    <span className="text-sm py-1 border-b border-gray-800 min-h-7 text-black">{formData.acCode || '\u00A0'}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold mb-1 text-gray-600 uppercase tracking-wider">Posted By</span>
                    <span className="text-sm py-1 border-b border-gray-800 min-h-7 text-black">{formData.postedBy || '\u00A0'}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold mb-1 text-gray-600 uppercase tracking-wider">Date</span>
                    <span className="text-sm py-1 border-b border-gray-800 min-h-7 text-black">{formData.postedDate || '\u00A0'}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleDownload}
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md"
              >
                Download Receipt
              </button>
              <button
                onClick={handlePrint}
                className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-md"
              >
                Print Receipt
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
