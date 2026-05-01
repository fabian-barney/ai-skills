# Example Spring Constructor DI With Lombok

```java
@Service
@RequiredArgsConstructor
@Slf4j
public final class InvoiceService {

  private final InvoiceRepository invoiceRepository;
  private final InvoiceSender invoiceSender;

  public void sendPendingInvoices() {
    log.info("Sending pending invoices");
    invoiceSender.sendAll(invoiceRepository.findPending());
  }
}
```

```properties
lombok.addLombokGeneratedAnnotation = true
lombok.copyableAnnotations += org.springframework.beans.factory.annotation.Qualifier
```
