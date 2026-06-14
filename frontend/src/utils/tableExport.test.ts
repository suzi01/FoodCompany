import { beforeEach, describe, expect, it, vi } from 'vitest';
import autoTable from 'jspdf-autotable';
import { handleTableExport, ExportColumn } from './tableExport';

vi.mock('jspdf-autotable', () => ({
  default: vi.fn(),
}));

describe('handleTableExport', () => {
  const mockColumns: ExportColumn[] = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
  ];

  const mockRows = [
    { name: 'John Doe', email: 'john@example.com' },
    { name: 'Jane Smith', email: 'jane@example.com' },
  ];

  const fileName = 'test-export';
  const createObjectURLMock = vi.fn(() => 'blob:mock-url');
  const revokeObjectURLMock = vi.fn();
  const originalCreateElement = document.createElement.bind(document);

  beforeEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();

    Object.defineProperty(URL, 'createObjectURL', {
      configurable: true,
      writable: true,
      value: createObjectURLMock,
    });

    Object.defineProperty(URL, 'revokeObjectURL', {
      configurable: true,
      writable: true,
      value: revokeObjectURLMock,
    });
  });

  it('should call exportToCsv when format is csv', () => {
    const anchor = originalCreateElement('a');
    const clickSpy = vi.spyOn(anchor, 'click').mockImplementation(() => {});
    vi.spyOn(document, 'createElement').mockImplementation((tagName) => {
      if (tagName === 'a') {
        return anchor;
      }

      return originalCreateElement(tagName);
    });

    handleTableExport('csv', mockColumns, mockRows, fileName);

    expect(createObjectURLMock).toHaveBeenCalledTimes(1);
    expect(anchor.download).toBe(`${fileName}.csv`);
    expect(clickSpy).toHaveBeenCalledTimes(1);
  });

  it('should call exportToExcel when format is excel', () => {
    const anchor = originalCreateElement('a');
    const clickSpy = vi.spyOn(anchor, 'click').mockImplementation(() => {});
    vi.spyOn(document, 'createElement').mockImplementation((tagName) => {
      if (tagName === 'a') {
        return anchor;
      }

      return originalCreateElement(tagName);
    });

    handleTableExport('excel', mockColumns, mockRows, fileName);

    expect(createObjectURLMock).toHaveBeenCalledTimes(1);
    expect(anchor.download).toBe(`${fileName}.xlsx`);
    expect(clickSpy).toHaveBeenCalledTimes(1);
  });

  it('should call exportToPdf when format is pdf', () => {
    handleTableExport('pdf', mockColumns, mockRows, fileName);

    expect(autoTable).toHaveBeenCalledTimes(1);
    expect(createObjectURLMock).not.toHaveBeenCalled();
  });

  it('should pass correct parameters with custom fileName', () => {
    const anchor = originalCreateElement('a');
    vi.spyOn(anchor, 'click').mockImplementation(() => {});
    vi.spyOn(document, 'createElement').mockImplementation((tagName) => {
      if (tagName === 'a') {
        return anchor;
      }

      return originalCreateElement(tagName);
    });

    const customFileName = 'custom-export-name';

    handleTableExport('csv', mockColumns, mockRows, customFileName);

    expect(anchor.download).toBe(`${customFileName}.csv`);
  });

  it('should handle empty rows array', () => {
    const anchor = originalCreateElement('a');
    vi.spyOn(anchor, 'click').mockImplementation(() => {});
    vi.spyOn(document, 'createElement').mockImplementation((tagName) => {
      if (tagName === 'a') {
        return anchor;
      }

      return originalCreateElement(tagName);
    });

    const emptyRows: typeof mockRows = [];

    handleTableExport('excel', mockColumns, emptyRows, fileName);

    expect(createObjectURLMock).toHaveBeenCalledTimes(1);
    expect(anchor.download).toBe(`${fileName}.xlsx`);
  });
});
