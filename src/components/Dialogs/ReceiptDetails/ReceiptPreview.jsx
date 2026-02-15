import { useState, useEffect } from 'react';
import html2pdf from 'html2pdf.js';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from '../../ui/Dialog.jsx';
import './ReceiptPreview.css';
import logo from '../../../assets/logo.jpeg';
import signature from '../../../assets/Signature.jpeg';
import { numberToWords } from '../../numberToWords.jsx';
import { Pencil2Icon } from '@radix-ui/react-icons';

const ReceiptPreview = ({ donation, open, onClose }) => {
    
    if (!donation) return null;

    const downloadPdf = async () => {
        const element = document.getElementById("receipt");
        if (!element) {
            console.error("PDF element not found");
            return;
        }
        await html2pdf()
            .from(element)
            .set({
                margin: 0,
                filename: `${donation.receiptNumber}.pdf`,
                jsPDF: {
                    unit: "in",
                    format: [12.5, 9.38],
                    orientation: "landscape"
                }
            })
            .save();
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="receipt-dialog" aria-describedby={undefined}>
                <DialogHeader>
                    <DialogTitle>Receipt</DialogTitle>
                </DialogHeader>

                <div className="receipt-wrapper">
                    <div id="receipt" className="receipt-container">
                        
                        <div className="receipt-header">
                            <div className="left-info">
                                <p><strong>Regn. No. S/63750/2008</strong></p>
                                <p><strong>PAN No. AABTK9999H </strong> </p>
                            </div>

                            <div className="center-header">
                                {/* Large Logo as requested */}
                                <img src={logo} alt="Logo" className="large-logo" />
                                {/* <h1>KARTAVYA</h1>
                                <p className="chapter-info">IIT(ISM), DHANBAD CHAPTER</p>
                                <p className="reg-act">All India Society Under Registration Act of X, XI, 1860</p> */}
                            </div>
{/* 
                            <div className="right-info">
                                <p>Founded as: KARTAVYA</p>
                            </div> */}
                        </div>

                        <h2 className="receipt-title">DONATION / CONTRIBUTION RECEIPT</h2>

                        <div className="receipt-body">
                            <div className="meta-row">
                                <p className="no-border"><strong>Date -</strong> {new Date(donation.donationDate).toLocaleDateString("en-GB")}</p>
                                <p className="no-border"><strong>Receipt No - {donation.receiptNumber}</strong></p>
                            </div>
                            
                            <p className="field-row">
                                <strong>Received With Thanks From -</strong> <span>{donation.name}</span>
                            </p>
                            
                            <p className="field-row">
                                <strong>A Sum of Rupees (In Words) -</strong> <span>{numberToWords(donation.amount)} </span>
                            </p>

                            <p className="field-row">
                                <strong>Internal Reference No.: </strong> <span>{donation._id}</span>
                            </p>
                            
                            <div className="amount-email-row">
                                <p className="field-row flex-1">
                                    <strong>Amount (In Figure) -</strong> <span>₹{donation.amount}</span>
                                </p>
                    
                                <p className="field-row flex-2">
                                    <strong>Email -</strong> <span>{donation.email}</span>
                                </p>
                            </div>

                            <p className="field-row">
                                <strong>As Donation/Sponsorship for -</strong> <span>KARTAVYA ("Dhanbad Chapter")</span>
                            </p>
                        </div>

                        <div className="signature-section">
                            <img src={signature} alt="Signature" />
                            <p>
                            Praveen Kumar
                            (Executive Director)
                            </p>
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <button className="download-btn" onClick={downloadPdf}>
                        <Pencil2Icon style={{ marginRight: '8px' }} />
                        Download Receipt
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ReceiptPreview;