document.addEventListener('DOMContentLoaded', function () {
    fetchCertificates('./certificates/csv/certificates_1.csv', 'specialization-certificates');
    fetchCertificates('./certificates/csv/certificates_2.csv', 'professional-certificates');
    fetchCertificates('./certificates/csv/certificates_3.csv', 'workshop-certificates');
    fetchBadges('./certificates/csv/badges.csv', 'badge-container');
});

function fetchCertificates(csvFile, containerId) {
    fetch(csvFile)
        .then(response => response.text())
        .then(data => {
            const rows = data.split('\n').slice(1); // Skip header row
            const container = document.getElementById(containerId);

            rows.forEach(row => {
                const columns = row.split(',');
                const certificateName = columns[0];
                const issuedBy = columns[1];
                const issueDate = columns[2];
                const credentialID = columns[3];
                const credentialURL = columns[4];
                const logoURL = columns[5];

                // Check if any column contains undefined data
                if (certificateName === 'undefined' || issuedBy === 'undefined' || issueDate === 'undefined' || credentialID === 'undefined' || credentialURL === 'undefined' || logoURL === 'undefined') {
                    return; // Skip this row if any column contains undefined data
                }

                const certificateItem = document.createElement('div');
                certificateItem.classList.add('certificate-item');

                const certificateLink = document.createElement('a');
                certificateLink.href = credentialURL;
                certificateLink.classList.add('box1-link');
                certificateLink.target = '_blank'; // Open link in a new tab

                const certificateBox = document.createElement('div');
                certificateBox.classList.add('box1');

                const logoContainer = document.createElement('div');
                logoContainer.classList.add('logo1');
                const logoImg = document.createElement('img');
                logoImg.src = logoURL;
                logoContainer.appendChild(logoImg);

                const contentContainer = document.createElement('div');
                contentContainer.classList.add('content');
                const certificateTitle = document.createElement('h3');
                certificateTitle.textContent = certificateName;
                const issuedByPara = document.createElement('p');
                issuedByPara.textContent = '' + issuedBy;
                issuedByPara.classList.add('issued-by'); // Add the issued-by class
                const issueDatePara = document.createElement('p');
                issueDatePara.textContent = 'Issue Date: ' + issueDate;
                const credentialIDPara = document.createElement('p');
                credentialIDPara.textContent = 'Credential ID: ' + credentialID;

                contentContainer.appendChild(certificateTitle);
                contentContainer.appendChild(issuedByPara);
                contentContainer.appendChild(issueDatePara);
                contentContainer.appendChild(credentialIDPara);

                certificateBox.appendChild(logoContainer);
                certificateBox.appendChild(contentContainer);

                certificateLink.appendChild(certificateBox);
                certificateItem.appendChild(certificateLink);

                container.appendChild(certificateItem);
            });
        })
        .catch(error => console.error('Error fetching certificates data:', error));
}

function fetchBadges(csvFile, containerId) {
    fetch(csvFile)
        .then(response => response.text())
        .then(data => {
            const rows = data.split('\n').slice(1); // Skip header row
            const container = document.getElementById(containerId);

            rows.forEach(row => {
                const columns = row.split(',');
                const badgeName = columns[0];
                const badgeURL = columns[1];
                const verificationURL = columns[2];

                // Check if any column contains undefined data
                if (badgeName === 'undefined' || badgeURL === 'undefined' || verificationURL === 'undefined') {
                    return; // Skip this row if any column contains undefined data
                }

                const badgeItem = document.createElement('div');
                badgeItem.classList.add('badge-item');

                const badgeLink = document.createElement('a');
                badgeLink.href = verificationURL;
                badgeLink.classList.add('badge-link');
                badgeLink.target = '_blank'; // Open link in a new tab

                const badgeContainer = document.createElement('div');
                badgeContainer.classList.add('badge');

                const badgeImg = document.createElement('img');
                badgeImg.src = badgeURL;
                badgeImg.alt = badgeName;

                const badgeNameSpan = document.createElement('span');
                badgeNameSpan.classList.add('badge-name');
                badgeNameSpan.textContent = badgeName;

                badgeContainer.appendChild(badgeImg);
                badgeContainer.appendChild(badgeNameSpan);
                badgeLink.appendChild(badgeContainer);
                badgeItem.appendChild(badgeLink);

                container.appendChild(badgeItem);
            });
        })
        .catch(error => console.error('Error fetching badges data:', error));
}
