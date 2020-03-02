package hu.flowacademy.companycalendar.email;

public enum EmailType {
  CREATE("new-meeting.html"), UPDATE("update-meeting.html");

  private String templateName;

  EmailType(String templateName) {
    this.templateName = templateName;
  }

  public String getTemplateName() {
    return templateName;
  }
}
