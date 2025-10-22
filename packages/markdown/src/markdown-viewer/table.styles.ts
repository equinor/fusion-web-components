import { css } from 'lit';

export const tableStyles = css`
  /* Table styling */
  #content table {
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
    margin: 1rem 0;
    font-size: 0.875rem;
    line-height: 1.4;
  }

  #content th,
  #content td {
    border: 1px solid #e1e5e9;
    padding: 0.5rem 0.75rem;
    text-align: left;
    vertical-align: top;
  }

  #content th {
    background-color: #f8f9fa;
    font-weight: 600;
    color: #495057;
  }

  #content tr:nth-child(even) {
    background-color: #f8f9fa;
  }

  #content tr:hover {
    background-color: #e9ecef;
  }

  /* Responsive table */
  @media (max-width: 768px) {
    #content table {
      font-size: 0.75rem;
    }

    #content th,
    #content td {
      padding: 0.25rem 0.5rem;
    }
  }
`;
