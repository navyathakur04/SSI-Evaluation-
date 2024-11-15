import React, { useState } from 'react';
import jsPDF from 'jspdf';
const AntibioticForm = () => {
  const [antibiotic_form, set_antibiotic_form] = useState({
    prior_antibiotics: [
      { name: '', route: '', duration: '', doses: '' },
      { name: '', route: '', duration: '', doses: '' },
      { name: '', route: '', duration: '', doses: '' },
    ],
    pre_peri_antibiotics: [
      { name: '', route: '', duration: '', doses: '' },
      { name: '', route: '', duration: '', doses: '' },
      { name: '', route: '', duration: '', doses: '' },
    ],
    post_antibiotics: [
      { name: '', route: '', duration: '', doses: '' },
      { name: '', route: '', duration: '', doses: '' },
      { name: '', route: '', duration: '', doses: '' },
      { name: '', route: '', duration: '', doses: '' },
      { name: '', route: '', duration: '', doses: '' },
      { name: '', route: '', duration: '', doses: '' },
    ],
    time_induction: '',
    time_incision: '',
    end_time_surgery: '',
  });

  const [downloadPrompt, setDownloadPrompt] = useState(false);

  const handle_change = (e, section, index) => {
    const { name, value } = e.target;
    const updated_section = [...antibiotic_form[section]];
    updated_section[index][name] = value;
    set_antibiotic_form({ ...antibiotic_form, [section]: updated_section });
  };

  const handle_time_change = (e) => {
    const { name, value } = e.target;
    set_antibiotic_form({ ...antibiotic_form, [name]: value });
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text('Antibiotic Prescription Surveillance Form', 10, 10);

    let yOffset = 20;
    const sections = [
      { key: 'prior_antibiotics', title: 'Antibiotics given prior to operation' },
      { key: 'pre_peri_antibiotics', title: 'Antibiotics given Pre/Perioperatively' },
      { key: 'post_antibiotics', title: 'Antibiotics given after peri-operative Prophylaxis' },
    ];

    sections.forEach((section) => {
      doc.setFontSize(12);
      doc.text(section.title, 10, yOffset);
      yOffset += 10;

      antibiotic_form[section.key].forEach((item, index) => {
        doc.text(
          `Antibiotic ${index + 1}: Name - ${item.name || 'N/A'}, Route - ${item.route || 'N/A'}, Duration - ${item.duration || 'N/A'}, Doses - ${item.doses || 'N/A'}`,
          10,
          yOffset
        );
        yOffset += 10;
      });
      yOffset += 5;
    });

    doc.text(`Time of Induction: ${antibiotic_form.time_induction || 'N/A'}`, 10, yOffset);
    yOffset += 10;
    doc.text(`Time of Incision: ${antibiotic_form.time_incision || 'N/A'}`, 10, yOffset);
    yOffset += 10;
    doc.text(`End Time of Surgery: ${antibiotic_form.end_time_surgery || 'N/A'}`, 10, yOffset);

    doc.save('antibiotic_form_data.pdf');
  };
  const antibiotics_options = [
    'Amoxicillin-clavulanic acid', 'Amikacin', 'Aztreonam', 'Cefepime', 
    'Ceftazidime', 'Ceftriaxone', 'Netilmicin', 'Meropenem', 'Imipenem', 
    'Levofloxacin', 'Norfloxacin', 'Ciprofloxacin', 'Cefoperazone/Sulbactam',
    'Ticarcillin/Clavulanic acid', 'Piperacillin-tazobactam', 
    'Ceftazidime/Avibactam', 'Penicillin', 'Oxacillin', 'Gentamicin', 
    'Tetracycline', 'Clindamycin', 'Vancomycin E STRIP', 'Linezolid', 
    'Teicoplanin', 'Nitrofurantoin', 'Erythromycin', 'Cefoxitin', 
    'Co-trimoxazole', 'Netilmicin', 'Ertapenem', 'Chloramphenicol', 
    'Fosfomycin', 'Colistin E STRIP'
  ];

  const routes_of_administration = [
    'I/V', 'I/M', 'S/C', 'I/D', 'P/O', 'Local Application', 'Sub Lingual',
  ];

  const doses_options = ['01', '02', '03', '04', '05'];

  const render_antibiotic_fields = (section, heading) => (
    <div>
      <h3>{heading}</h3>
      <div style={styles.formHeader}>
        <span>Antibiotic Name</span>
        <span>Route of Administration</span>
        <span>Duration</span>
        <span>No. of Doses</span>
      </div>
      {antibiotic_form[section].map((item, index) => (
        <div key={index} style={styles.formRow}>
          <select
            name="name"
            value={item.name}
            onChange={(e) => handle_change(e, section, index)}
            style={styles.formSelect}
          >
            <option value="">Select Antibiotic</option>
            {antibiotics_options.map((antibiotic, idx) => (
              <option key={idx} value={antibiotic}>{antibiotic}</option>
            ))}
          </select>
          <select
            name="route"
            value={item.route}
            onChange={(e) => handle_change(e, section, index)}
            style={styles.formSelect}
          >
            <option value="">Select Route</option>
            {routes_of_administration.map((route, idx) => (
              <option key={idx} value={route}>{route}</option>
            ))}
          </select>
          <input
            type="text"
            name="duration"
            placeholder="Duration"
            value={item.duration}
            onChange={(e) => handle_change(e, section, index)}
            style={styles.formInput}
          />
          <select
            name="doses"
            value={item.doses}
            onChange={(e) => handle_change(e, section, index)}
            style={styles.formSelect}
          >
            <option value="">Select Doses</option>
            {doses_options.map((dose, idx) => (
              <option key={idx} value={dose}>{dose}</option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );

  return (
    <form style={styles.antibioticForm}>
      <h2>Antibiotic Prescription Surveillance Form</h2>

      {render_antibiotic_fields('prior_antibiotics', 'Antibiotics given prior to operation')}
      {render_antibiotic_fields('pre_peri_antibiotics', 'Antibiotics given Pre/Perioperatively')}
      {render_antibiotic_fields('post_antibiotics', 'Antibiotics given after peri-operative Prophylaxis')}

      <div style={styles.formRow}>
        <label style={styles.label}>Time of Induction:</label>
        <input
          type="time"
          name="time_induction"
          value={antibiotic_form.time_induction}
          onChange={handle_time_change}
          style={styles.formInput}
        />
      </div>

      <div style={styles.formRow}>
        <label style={styles.label}>Time of Incision:</label>
        <input
          type="time"
          name="time_incision"
          value={antibiotic_form.time_incision}
          onChange={handle_time_change}
          style={styles.formInput}
        />
      </div>

      <div style={styles.formRow}>
        <label style={styles.label}>End Time of Surgery:</label>
        <input
          type="time"
          name="end_time_surgery"
          value={antibiotic_form.end_time_surgery}
          onChange={handle_time_change}
          style={styles.formInput}
        />
      </div>

      <button type="submit" style={styles.submitButton}>
        Submit
      </button>
      <button type="button" onClick={handleDownloadPDF} style={styles.downloadButton}>
        Download as PDF
      </button>

      {downloadPrompt && <p style={styles.downloadPrompt}>Form data has been downloaded!</p>}
    </form>
  );
};

const styles = {
  antibioticForm: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  formHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  formRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  formInput: {
    width: '23%',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
  },
  formSelect: {
    width: '23%',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  label: {
    fontWeight: 'bold',
    marginRight: '10px',
  },
  submitButton: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '20px',
  },
  downloadButton: {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '20px',
    marginLeft: '10px',
  },
  downloadPrompt: {
    marginTop: '10px',
    color: '#28a745',
  },
};

export default AntibioticForm;
