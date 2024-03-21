function validateForm() {
    const transferType = document.getElementById('transferType').value;
    const transferAmount = parseFloat(document.getElementById('transferAmount').value);
    const userBalance = parseFloat(document.getElementById('userBalance').value);
    if (transferType === 'transfer' || transferType === 'deposit' || transferType === 'withdraw') {
        if (transferAmount <= 0) {
            alert('Amount must be greater than 0.');
            return false;
        }else if ((transferType === 'withdraw' || transferType === 'transfer') && userBalance < transferAmount) {
            alert(`Insufficient balance to ${transferType}.`);
            return false;
        }
    }

    return true;
}

document.getElementById('transferType').addEventListener('change', function () {
    var transferType = this.value;
    var transferDetails = document.getElementById('transferDetails');
    var amountLabel = document.getElementById('amountLabel');
    var amountDetails = document.getElementById('amountDetails');

    if (transferType === 'transfer') {
        transferDetails.style.display = 'block';
        amountDetails.style.display = 'block';
        amountLabel.innerText = 'Amount to Transfer:';
    } else if (transferType === 'deposit') {
        transferDetails.style.display = 'none';
        amountDetails.style.display = 'block';
        amountLabel.innerText = 'Amount to Deposit:';
    } else if (transferType === 'withdraw') {
        transferDetails.style.display = 'none';
        amountDetails.style.display = 'block';
        amountLabel.innerText = 'Amount to Withdraw:';
    } else {
        transferDetails.style.display = 'none';
        amountDetails.style.display = 'none';
    }
});