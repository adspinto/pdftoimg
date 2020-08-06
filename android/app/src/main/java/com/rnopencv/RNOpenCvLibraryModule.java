package com.rnopencv;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;


import android.content.Context;
import android.content.ContentResolver;
import android.provider.MediaStore;
import android.graphics.BitmapFactory;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Bundle;

import org.json.JSONObject;
import org.json.JSONTokener;
import org.opencv.core.CvType;
import org.opencv.core.Mat;
import org.opencv.core.MatOfPoint;
import org.opencv.core.MatOfRect;
import org.opencv.core.Rect;
import org.opencv.core.Scalar;
import org.opencv.imgproc.Imgproc;
import org.opencv.android.Utils;
import org.opencv.imgproc.Imgproc;
import org.opencv.features2d.MSER;
import android.util.Base64;
import android.util.Log;
import org.opencv.utils.Converters;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import org.json.JSONArray;

import static org.opencv.imgcodecs.Imgcodecs.imread;

public class RNOpenCvLibraryModule extends ReactContextBaseJavaModule {


    private final ReactApplicationContext reactContext;


    public RNOpenCvLibraryModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "RNOpenCvLibrary";
    }

    @ReactMethod
    public void checkForBlurryImage(String imageAsBase64, Callback errorCallback, Callback successCallback) {
        try {
            BitmapFactory.Options options = new BitmapFactory.Options();
            options.inDither = true;
            options.inPreferredConfig = Bitmap.Config.ARGB_8888;

            byte[] decodedString = Base64.decode(imageAsBase64, Base64.DEFAULT);
            Bitmap image = BitmapFactory.decodeByteArray(decodedString, 0, decodedString.length);


//      Bitmap image = decodeSampledBitmapFromFile(imageurl, 2000, 2000);
            int l = CvType.CV_8UC1; //8-bit grey scale image
            Mat matImage = new Mat();
            Utils.bitmapToMat(image, matImage);
            Mat matImageGrey = new Mat();
            Imgproc.cvtColor(matImage, matImageGrey, Imgproc.COLOR_BGR2GRAY);

            Bitmap destImage;
            destImage = Bitmap.createBitmap(image);
            Mat dst2 = new Mat();
            Utils.bitmapToMat(destImage, dst2);
            Mat laplacianImage = new Mat();
            dst2.convertTo(laplacianImage, l);
            Imgproc.Laplacian(matImageGrey, laplacianImage, CvType.CV_8U);
            Mat laplacianImage8bit = new Mat();
            laplacianImage.convertTo(laplacianImage8bit, l);

            Bitmap bmp = Bitmap.createBitmap(laplacianImage8bit.cols(), laplacianImage8bit.rows(), Bitmap.Config.ARGB_8888);
            Utils.matToBitmap(laplacianImage8bit, bmp);
            int[] pixels = new int[bmp.getHeight() * bmp.getWidth()];
            bmp.getPixels(pixels, 0, bmp.getWidth(), 0, 0, bmp.getWidth(), bmp.getHeight());
            int maxLap = -16777216; // 16m
            for (int pixel : pixels) {
                if (pixel > maxLap)
                    maxLap = pixel;
            }

//            int soglia = -6118750;
            int soglia = -8118750;
            if (maxLap <= soglia) {
                System.out.println("is blur image");
            }

            successCallback.invoke(maxLap <= soglia, maxLap, soglia);
        } catch (Exception e) {
            errorCallback.invoke(e.getMessage());
        }
    }

     @ReactMethod
     public void detectCorners(String uri, Callback errorCallback, Callback successCallback) {
       try {
           Uri _uri = Uri.parse(uri);
           Mat img = imread(_uri.getPath());
           Mat imgGray = new Mat();
           Imgproc.cvtColor(img, imgGray, Imgproc.COLOR_BGR2GRAY);

           List<MatOfPoint> contours = new ArrayList<MatOfPoint>();
           Mat hierarchy = new Mat();

           Imgproc.findContours(imgGray,contours, hierarchy, Imgproc.RETR_CCOMP, Imgproc.CHAIN_APPROX_SIMPLE );

           ArrayList<Rect> resultData = new ArrayList<Rect>();
           WritableMap _resultData = new WritableNativeMap();

           for (int i = 0; i < contours.size(); i++) {
               Mat contour = contours.get(i);
               double contourArea = Imgproc.contourArea(contour);

               _resultData.putString("key" + i,String.valueOf(contourArea));

           }



           successCallback.invoke("convertido com file", _resultData);
           img.release();
       } catch (Exception e) {
           errorCallback.invoke(e);
       }

     }

   

    public native void doWithMat(long matNumber);


}