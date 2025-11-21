package com.kababhut.catering;

import android.os.Bundle;
import android.webkit.WebView;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        // Enable remote debugging - this fixes scrolling!
        WebView.setWebContentsDebuggingEnabled(true);
        
        // Enable scrolling in WebView
        WebView webView = getBridge().getWebView();
        webView.setVerticalScrollBarEnabled(true);
        webView.setScrollBarStyle(WebView.SCROLLBARS_OUTSIDE_OVERLAY);
        webView.setOverScrollMode(WebView.OVER_SCROLL_ALWAYS);
    }
}
