package com.cntt2.order.service;

import com.cntt2.order.model.Order;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

public class ExcelHelper {

    public static String TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    static String[] HEADERs = { "Id", "Created By", "Created Date", "Status", "Update By", "Updated Date" };
    static String SHEET = "Orders";

    public static ByteArrayInputStream ordersToExcel(List<Order> orders) {

        try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream();) {
            Sheet sheet = workbook.createSheet(SHEET);

            // Create a style for the "Order Statistics" header
            CellStyle titleStyle = workbook.createCellStyle();
            Font titleFont = workbook.createFont();
            titleFont.setBold(true);
            titleFont.setFontHeightInPoints((short) 20);
            titleStyle.setFont(titleFont);
            titleStyle.setFillForegroundColor(IndexedColors.LIGHT_YELLOW.getIndex());
            titleStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            titleStyle.setAlignment(HorizontalAlignment.CENTER);

            // Create a style for the regular headers
            CellStyle headerStyle = workbook.createCellStyle();
            Font headerFont = workbook.createFont();
            headerFont.setBold(true);
            headerFont.setFontHeightInPoints((short) 12);
            headerStyle.setFont(headerFont);
            headerStyle.setFillForegroundColor(IndexedColors.LIGHT_GREEN.getIndex());
            headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);

            // Set borders for all cells
            CellStyle borderedCellStyle = workbook.createCellStyle();
            borderedCellStyle.setBorderBottom(BorderStyle.THIN);
            borderedCellStyle.setBorderTop(BorderStyle.THIN);
            borderedCellStyle.setBorderRight(BorderStyle.THIN);
            borderedCellStyle.setBorderLeft(BorderStyle.THIN);

            // Header "Order Statistics"
            Row titleRow = sheet.createRow(0);
            Cell titleCell = titleRow.createCell(0);
            titleCell.setCellValue("Order Statistics");
            titleCell.setCellStyle(titleStyle);
            titleCell.getCellStyle().setAlignment(HorizontalAlignment.CENTER);

            // Merge and center the title cell
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, HEADERs.length - 1));

            // Regular headers
            Row headerRow = sheet.createRow(1);

            for (int col = 0; col < HEADERs.length; col++) {
                Cell cell = headerRow.createCell(col);
                cell.setCellValue(HEADERs[col]);
                cell.setCellStyle(headerStyle);
            }

            int rowIdx = 2; // Start from the third row after the title and header
            for (Order order : orders) {
                Row row = sheet.createRow(rowIdx++);

                Cell cell0 = row.createCell(0);
                cell0.setCellValue(order.getId());
                cell0.setCellStyle(borderedCellStyle);

                Cell cell1 = row.createCell(1);
                cell1.setCellValue(order.getCreatedBy());
                cell1.setCellStyle(borderedCellStyle);

                Cell cell2 = row.createCell(2);
                cell2.setCellValue(order.getCreatedDate());
                cell2.setCellStyle(borderedCellStyle);

                Cell cell3 = row.createCell(3);
                cell3.setCellValue(order.getStatus());
                cell3.setCellStyle(borderedCellStyle);

                Cell cell4 = row.createCell(4);
                cell4.setCellValue(order.getUpdatedBy());
                cell4.setCellStyle(borderedCellStyle);

                Cell cell5 = row.createCell(5);
                cell5.setCellValue(order.getUpdatedDate());
                cell5.setCellStyle(borderedCellStyle);
            }

            // Auto-size columns
            for (int col = 0; col < HEADERs.length; col++) {
                sheet.autoSizeColumn(col);
            }

            workbook.write(out);
            return new ByteArrayInputStream(out.toByteArray());
        } catch (IOException e) {
            throw new RuntimeException("fail to import data to Excel file: " + e.getMessage());
        }
    }

}
