(function () {
    const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
            console.log(`${entry.name}:\ndomComplete time: ${entry.domComplete}ms`);
            const domContentLoadedTime =
                entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart;
            console.log(
                `DOMContentLoaded processing time: ${domContentLoadedTime}ms`
            );
            console.log(
                `domInteractive time: ${entry.domInteractive}ms`
            );
            const tcp = entry.connectEnd - entry.connectStart;
            if (tcp > 0) {
                console.log(`TCP handshake duration: ${tcp}ms`);
            }
            const dns = entry.domainLookupEnd - entry.domainLookupStart;
            if (dns > 0) {
                console.log(`DNS lookup duration: ${dns}ms`);
            }
        });
    });

    observer.observe({ type: "navigation", buffered: true });

})()