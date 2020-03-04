package hu.flowacademy.companycalendar.model;

public enum Location {
    MEETING_ROOM("Tárgyaló"),
    MARKS_OFFICE("Márk idodája"),
    ARONS_OFFICE("Áron irodája"),
    OTHER("Egyéb helyszín");

    private String realName;
    public String getRealName()
    { return this.realName; }

    private Location(String realName)
    { this.realName = realName; }
}
