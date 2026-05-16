import { LeadSource } from './domain/sales.enums';

export type ParsedSalesLeadCsvRow = {
  customerName: string;
  customerPhone: string;
  interestSummary: string;
};

function parseCsvLine(line: string): string[] {
  const cells: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];

    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (char === ',' && !inQuotes) {
      cells.push(current.trim());
      current = '';
      continue;
    }

    current += char;
  }

  cells.push(current.trim());

  return cells;
}

function normalizeHeader(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, '');
}

export function parseSalesLeadsCsv(csv: string): ParsedSalesLeadCsvRow[] {
  const lines = csv
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (!lines.length) {
    return [];
  }

  const firstCells = parseCsvLine(lines[0]);
  const headerMap = new Map(
    firstCells.map((cell, index) => [normalizeHeader(cell), index]),
  );
  const hasHeader =
    headerMap.has('customername') ||
    headerMap.has('name') ||
    headerMap.has('customerphone') ||
    headerMap.has('phone');

  const nameIndex = headerMap.get('customername') ?? headerMap.get('name') ?? 0;
  const phoneIndex =
    headerMap.get('customerphone') ?? headerMap.get('phone') ?? 1;
  const interestIndex =
    headerMap.get('interestsummary') ??
    headerMap.get('interest') ??
    headerMap.get('notes') ??
    2;

  const dataLines = hasHeader ? lines.slice(1) : lines;
  const rows: ParsedSalesLeadCsvRow[] = [];

  for (const line of dataLines) {
    const cells = parseCsvLine(line);
    const customerName = (cells[nameIndex] ?? cells[0] ?? '').trim();
    const customerPhone = (cells[phoneIndex] ?? cells[1] ?? '').trim();
    const interestSummary = (
      cells[interestIndex] ??
      cells[2] ??
      'Imported from CSV'
    ).trim();

    if (!customerName || !customerPhone) {
      continue;
    }

    rows.push({
      customerName,
      customerPhone,
      interestSummary: interestSummary || 'Imported from CSV',
    });
  }

  return rows;
}

export function leadSourceLabel(source: LeadSource): string {
  switch (source) {
    case LeadSource.Website:
      return 'Website';
    case LeadSource.Facebook:
      return 'Facebook';
    case LeadSource.Instagram:
      return 'Instagram';
    default:
      return 'Lead';
  }
}
