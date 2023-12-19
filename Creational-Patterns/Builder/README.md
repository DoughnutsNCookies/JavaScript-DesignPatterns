# 👷 Builder

Also known as the **Step Builder** pattern, the **Builder** design pattern is a creational pattern that separates the construction of a complex object from its representation. It allows the **same construction process to create different representations**.

## ❓ Problem

Consider a scenario where you are developing a system to create custom reports for a data analytics application. The challenge is to build **diverse types** of reports, each with its own set of components, formatting, and customization options.

Creating these reports directly in the client code or a **single monolithic** class becomes impractical. The system risks becoming **rigid and hard to maintain** as new report types are added or existing ones are modified.

## ✅ Solution

The **Builder** design pattern addresses this problem by providing a way to construct a complex object step by step. It involves defining a **common interface for constructing** all parts of the object and concrete builder classes that implement this interface to build different representations of the object.

In our report generation scenario, the `Director` class orchestrates the construction process, while concrete Builder classes, such as `PDFReportBuilder` and `HTMLReportBuilder`, handle the creation of specific parts of the report.

## ✍🏻 Application

In our data analytics project, we can start by defining a common interface, `ReportBuilder`, that declares methods for constructing different parts of the report.

```typescript
/**
 * Defining the common interface for report builders.
 */
interface ReportBuilder {
  buildHeader(): void;
  buildBody(): void;
  buildFooter(): void;
  getResult(): string;
}
```

Next, we implement concrete builder classes for different report types, such as `PDFReportBuilder` and `HTMLReportBuilder`. Each builder provides its own implementation for constructing the report.

```typescript
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
```

The `Director` class, `ReportDirector`, orchestrates the construction process using a specific builder.

```typescript
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
```

Now, the client code can use the builder pattern to create different types of reports without being concerned with the construction details.

```typescript
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
```

## ☯️ Pros and Cons

### Pros

- You can **construct objects step-by-step**, defer construction steps or run steps recursively.

- You can **reuse the same construction code** when building various representations of products.

- **Single Responsibility Principle**. You can **isolate complex construction code** from the business logic of the product.

### Cons

- The overall **complexity of the code increases** since the pattern requires creating multiple new classes.
