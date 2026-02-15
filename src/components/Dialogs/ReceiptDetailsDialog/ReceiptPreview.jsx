import { useEffect } from 'react';
import PropTypes from 'prop-types';
import html2pdf from 'html2pdf.js';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box
} from '@mui/material';
import './ReceiptPreview.css';
import logo from '../../../assets/logo.jpeg';
import signature from '../../../assets/Signature.jpeg';
import { numberToWords } from '../../../helper/numberToWords.jsx';

const ReceiptPreview = ({ donation, open, onClose }) => {

    if (!donation) return null;

    const downloadPdf = async () => {
        const element = document.getElementById("receipt");
        if (!element) return;

        await html2pdf()
            .from(element)
            .set({
                margin: 0,
                filename: `${donation.receiptNumber}.pdf`,
                jsPDF: {
                    unit: "in",
                    format: [13.5, 9.98],
                    orientation: "landscape"
                }
            })
            .save();
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="xl"
            fullWidth
            PaperProps={{
                className: "receipt-dialog"
            }}
        >
            <DialogTitle>Receipt</DialogTitle>

            <DialogContent>
                <Box className="receipt-wrapper">
                    <div id="receipt" className="receipt-container">

                        <div className="receipt-header">
                            <div className="left-info">
                                <p><strong>Regn. No. S/63750/2008</strong></p>
                                <p><strong>PAN No. AABTK9999H</strong></p>
                            </div>

                            <div className="center-header">
                                <img src={logo} alt="Logo" className="large-logo" />
                            </div>
                        </div>

                        <h2 className="receipt-title">DONATION / CONTRIBUTION RECEIPT</h2>

                        <div className="receipt-body">
                            <div className="meta-row">
                                <p className="no-border">
                                    <strong>Date -</strong>{" "}
                                    {new Date(donation.donationDate).toLocaleDateString("en-GB")}
                                </p>
                                <p className="no-border">
                                    <strong>Receipt No - {donation.receiptNumber}</strong>
                                </p>
                            </div>

                            <p className="field-row">
                                <strong>Received With Thanks From -</strong>{" "}
                                <span>{donation.name}</span>
                            </p>

                            <p className="field-row">
                                <strong>A Sum of Rupees (In Words) -</strong>{" "}
                                <span>{numberToWords(donation.amount)}</span>
                            </p>

                            <p className="field-row">
                                <strong>Internal Reference No. -</strong>{" "}
                                <span>{donation._id}</span>
                            </p>

                            <div className="amount-email-row">
                                <p className="field-row flex-1">
                                    <strong>Amount (In Figure) -</strong>{" "}
                                    <span>₹{donation.amount}</span>
                                </p>

                                <p className="field-row flex-2">
                                    <strong>Email -</strong>{" "}
                                    <span>{donation.email}</span>
                                </p>
                            </div>

                            <p className="field-row">
                                <strong>As Donation/Sponsorship for -</strong>{" "}
                                <span>KARTAVYA ("Dhanbad Chapter")</span>
                            </p>
                        </div>

                        <div className="signature-section">
                            <img src={signature} alt="Signature" />
                            <p>
                            Praveen Kumar<br/>
                            (Executive Director)</p>
                        </div>

                    </div>
                </Box>
            </DialogContent>

            <DialogActions className="dialog-actions">
                <Button 
                onClick={onClose}
                variant="contained"
                className="close-button"
                >
                    Close
                </Button>
                <Button
                    variant="contained"
                    onClick={downloadPdf}
                    className="close-button"
                >
                    Download Receipt
                </Button>
            </DialogActions>
        </Dialog>
    );
};

ReceiptPreview.propTypes = {
    open: PropTypes.bool.isRequired,
    donation: PropTypes.object,
    onClose: PropTypes.func.isRequired
};

export default ReceiptPreview;
