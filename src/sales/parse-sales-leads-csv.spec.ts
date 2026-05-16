import { parseSalesLeadsCsv } from './parse-sales-leads-csv';

describe('parseSalesLeadsCsv', () => {
  it('should parse headered CSV rows', () => {
    const rows = parseSalesLeadsCsv(
      'customerName,customerPhone,interestSummary\nJames,+254700000001,Harrier',
    );

    expect(rows).toEqual([
      {
        customerName: 'James',
        customerPhone: '+254700000001',
        interestSummary: 'Harrier',
      },
    ]);
  });

  it('should parse headerless two-column rows', () => {
    const rows = parseSalesLeadsCsv('Grace,+254700000002');

    expect(rows).toEqual([
      {
        customerName: 'Grace',
        customerPhone: '+254700000002',
        interestSummary: 'Imported from CSV',
      },
    ]);
  });
});
