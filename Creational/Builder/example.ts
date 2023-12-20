/**
 * Defining the common interface for report builders.
 */
interface ReportBuilder {
  buildHeader(): void;
  buildBody(): void;
  buildFooter(): void;
  getResult(): string;
}

/**
 * Implement concrete builder classes.
 */
class PDFReportBuilder implements ReportBuilder {
  // Implementation for building PDF report parts	
	buildHeader(): void {
		console.log('PDFReportBuilder.buildHeader');
	}

	buildBody(): void {
		console.log('PDFReportBuilder.buildBody');
	}

	buildFooter(): void {
		console.log('PDFReportBuilder.buildFooter');
	}

	getResult(): string {
		return 'PDFReportBuilder.getResult';
	}
}

class HTMLReportBuilder implements ReportBuilder {
  // Implementation for building HTML report parts
	buildHeader(): void {
		console.log('HTMLReportBuilder.buildHeader');
	}

	buildBody(): void {
		console.log('HTMLReportBuilder.buildBody');
	}

	buildFooter(): void {
		console.log('HTMLReportBuilder.buildFooter');
	}

	getResult(): string {
		return 'HTMLReportBuilder.getResult';
	}
}

/**
 * The Director class orchestrating the construction process.
 */
class ReportDirector {
  private reportBuilder: ReportBuilder;

  constructor(builder: ReportBuilder) {
    this.reportBuilder = builder;
  }

  constructReport(): void {
    this.reportBuilder.buildHeader();
    this.reportBuilder.buildBody();
    this.reportBuilder.buildFooter();
  }

  getResult(): string {
    return this.reportBuilder.getResult();
  }
}

/**
 * Client code using the builder pattern.
 *
 * @param director The director to use for constructing the report.
 */
function createReport(director: ReportDirector): string {
  director.constructReport();
  return director.getResult();
}

/**
 * Usage example.
 */
const pdfReportBuilder = new PDFReportBuilder();
const htmlReportBuilder = new HTMLReportBuilder();

const pdfReportDirector = new ReportDirector(pdfReportBuilder);
const htmlReportDirector = new ReportDirector(htmlReportBuilder);

const pdfReport = createReport(pdfReportDirector);
const htmlReport = createReport(htmlReportDirector);