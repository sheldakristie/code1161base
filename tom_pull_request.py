"""
Percentage between highschool graduates vs undergrad enrollment

Now with stacked continuing to uni/ not continuing!

This is a pull request from tom :)
"""

# yr12_plotdata
# undergrad_plotdata

percentage_edu = []
percentage_12 = []
for i in range(len(yr12_plotdata)):
    percentage_edu.append(undergrad_plotdata[i] / yr12_plotdata[i]* 100)
    percentage_12.append(100 - (undergrad_plotdata[i] / yr12_plotdata[i]* 100))

# percentage_edu

index = np.arange(len(yr12_plotdata))
intervals = range(len(yr12_plotdata))
labels = list(sorted(state_name));

plt.bar(index, percentage_edu, align="center", label="Continue to University");
plt.bar(index, percentage_12, bottom=percentage_edu , align="center", label="Do not continue to university");



plt.xticks(intervals, labels);
plt.title("Percentage of Undergrad Enrollment againts year 12 graduates.");
plt.xlabel("State");
plt.ylabel("Percentage out of 100%")
plt.legend();
