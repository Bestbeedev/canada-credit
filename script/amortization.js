        document.getElementById('open-modal-amortization').addEventListener('click', function () {
            document.getElementById('info-modal').classList.remove('hidden');
        });

        document.getElementById('close-info-modal').addEventListener('click', function () {
            document.getElementById('info-modal').classList.add('hidden');
        });

        document.getElementById('close-table-modal').addEventListener('click', function () {
            document.getElementById('table-modal').classList.add('hidden');
        });

        document.getElementById('amortization-form').addEventListener('submit', function (event) {
            event.preventDefault();
            const loanAmount = parseFloat(document.getElementById('loan-amount').value);
            const interestRate = parseFloat(document.getElementById('interest-rate').value) / 100 / 12; // Taux mensuel
            const loanTerm = document.getElementById('loan-term').value;
            const termUnit = document.getElementById('term-unit').value;
            const startYear = parseInt(document.getElementById('start-year').value);
            const startMonth = parseInt(document.getElementById('start-month').value);
            const currency = document.getElementById('currency').value;

            let totalPayments = 0;
            let totalInterest = 0;

            let amortizationTable = "<table class='w-full table-auto'><thead class='mb-5'><tr class='mb-4 text-center gap-x-4'><th style='padding: 10px;'>Échéance</th><th class='text-center mx-2' style='padding: 10px;'>Date</th><th class='text-center mx-2' style='padding: 10px;'>Capital restant dû</th><th class='text-center mx-2' style='padding: 10px;'>Mensualité sans assurance</th><th class='text-center mx-2' style='padding: 10px;'>Dont Capital</th><th class='text-center mx-2' style='padding: 10px;'>Dont Intérêt</th></tr></thead><tbody class='mb-5 justify-center items-center' style='border-bottom: 1px solid; margin-bottom: 20px;'>";
            let balance = loanAmount;
            const months = termUnit === 'mois' ? loanTerm : loanTerm * 12; // Convertir en mois
            const monthlyPayment = (loanAmount * interestRate) / (1 - Math.pow(1 + interestRate, -months));

            for (let month = 1; month <= months; month++) {
                const interestPayment = balance * interestRate;
                const principalPayment = monthlyPayment - interestPayment;
                balance -= principalPayment;

                totalPayments += monthlyPayment;
                totalInterest += interestPayment;

                const paymentDate = new Date(startYear, startMonth - 1 + month, 1);
                amortizationTable += `<tr class='border-b p-4 border-gray-300'> <!-- Increased padding for td -->
                    <td class='text-center'>${month}</td>
                    <td class='text-center'>${paymentDate.toLocaleDateString()}</td>
                    <td class='text-center'>${balance < 0 ? 0 : balance.toFixed(2)} ${currency}</td>
                    <td class='text-center'>${monthlyPayment.toFixed(2)} ${currency}</td>
                    <td class='text-center'>${principalPayment.toFixed(2)} ${currency}</td>
                    <td class='text-center'>${interestPayment.toFixed(2)} ${currency}</td>
                </tr>`;
            }

            amortizationTable += "</tbody class='pt-5'></table>";
            document.getElementById('amortization-table').innerHTML = amortizationTable;

            // Update the display values with user inputs
            document.getElementById('loan-amount-display').innerText = loanAmount.toFixed(2) + ' ' + currency;
            document.getElementById('currency-display').innerText = ''; // Remove currency symbol
            document.getElementById('loan-term-display').innerText = loanTerm;
            document.getElementById('term-unit-display').innerText = termUnit;
            document.getElementById('interest-rate-display').innerText = document.getElementById('interest-rate').value;
            document.getElementById('insurance-display').innerText = '0'; // Assurance mensuelle met seulement 0
            document.getElementById('start-date-display').innerText = `${new Date().getDate()} ${new Date().toLocaleString('default', { month: 'long' })} ${startYear}`;
            document.getElementById('monthly-payment-display').innerText = monthlyPayment.toFixed(2) + ' ' + currency;

            // Update totals with correct values
            document.getElementById('total-payments').innerText = totalPayments.toFixed(2) + ' ' + currency;
            document.getElementById('total-interest').innerText = totalInterest.toFixed(2) + ' ' + currency;

            document.getElementById('info-modal').classList.add('hidden');
            document.getElementById('table-modal').classList.remove('hidden');
        });

        document.getElementById('download-pdf').addEventListener('click', function () {
            const element = document.getElementById('table-modal-content');

            // Cacher les boutons avant la capture
            document.getElementById('download-pdf').classList.add('hidden');
            document.getElementById('purchase-demand').classList.add('hidden');

            domtoimage.toPng(element)
                .then(function (dataUrl) {
                    const { jsPDF } = window.jspdf;
                    const pdf = new jsPDF('p', 'mm', 'a4');
                    const imgWidth = 190; // Largeur en mm
                    const imgHeight = Math.min((element.scrollHeight * imgWidth) / element.offsetWidth, 297); // Ajustement hauteur avec limite

                    pdf.addImage(dataUrl, 'PNG', 10, 10, imgWidth, imgHeight);
                    pdf.save("tableau_amortissement.pdf");

                    // Réafficher les boutons après la capture
                    document.getElementById('download-pdf').classList.remove('hidden');
                    document.getElementById('purchase-demand').classList.remove('hidden');

                    alert("Le PDF a été téléchargé !");
                })
                .catch(function (error) {
                    console.error("Erreur lors de la génération du PDF :", error);
                    alert("Une erreur est survenue lors de la génération du PDF.");
                });
        });
