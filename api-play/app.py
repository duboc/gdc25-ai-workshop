from flask import Flask, request, Response
from flask_cors import CORS
from google_play_scraper import Sort, reviews
import pandas as pd
import io
from datetime import datetime

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/api/reviews', methods=['GET'])
def get_reviews():
    # Get parameters from request
    app_id = request.args.get('app_id')
    count = request.args.get('count', default=100, type=int)
    lang = request.args.get('lang', default='en')
    country = request.args.get('country', default='us')
    from_date = request.args.get('from_date')
    to_date = request.args.get('to_date')
    
    # Validate required parameters
    if not app_id:
        return {"error": "app_id parameter is required"}, 400
    
    # Validate date formats if provided
    try:
        if from_date:
            from_date = datetime.strptime(from_date, '%Y-%m-%d')
        if to_date:
            to_date = datetime.strptime(to_date, '%Y-%m-%d')
    except ValueError:
        return {"error": "Invalid date format. Use YYYY-MM-DD format."}, 400
    
    try:
        # Fetch reviews using google-play-scraper
        result, continuation_token = reviews(
            app_id,
            lang=lang,
            country=country,
            sort=Sort.NEWEST,
            count=count
        )
        
        # Convert to DataFrame
        df = pd.DataFrame(result)
        
        # Apply date filtering if specified
        if from_date or to_date:
            # Convert 'at' column to datetime
            df['at'] = pd.to_datetime(df['at'])
            
            if from_date:
                df = df[df['at'] >= from_date]
            if to_date:
                # Add one day to include the end date
                to_date = datetime(to_date.year, to_date.month, to_date.day, 23, 59, 59)
                df = df[df['at'] <= to_date]
        
        # Remove userName and userImage fields
        columns_to_drop = ['userName', 'userImage']
        df = df.drop(columns=[col for col in columns_to_drop if col in df.columns])
        
        # Generate CSV
        csv_data = io.StringIO()
        df.to_csv(csv_data, index=False)
        
        # Create response with CSV data
        response = Response(
            csv_data.getvalue(),
            mimetype="text/csv",
            headers={"Content-disposition": f"attachment; filename={app_id}_reviews.csv"}
        )
        
        return response
    
    except Exception as e:
        return {"error": str(e)}, 500

@app.route('/', methods=['GET'])
def home():
    return """
    <h1>Google Play Reviews API</h1>
    <p>Use the /api/reviews endpoint with the following parameters:</p>
    <ul>
        <li><strong>app_id</strong>: The package name of the app (e.g., org.supertuxkart.stk)</li>
        <li><strong>count</strong>: The number of reviews to fetch (default: 100)</li>
        <li><strong>lang</strong>: The language of the reviews (default: en)</li>
        <li><strong>country</strong>: The country for the reviews (default: us)</li>
        <li><strong>from_date</strong>: Filter reviews from this date (format: YYYY-MM-DD)</li>
        <li><strong>to_date</strong>: Filter reviews until this date (format: YYYY-MM-DD)</li>
    </ul>
    <p>Example: <a href="/api/reviews?app_id=org.supertuxkart.stk&count=50&lang=en&country=us">/api/reviews?app_id=org.supertuxkart.stk&count=50&lang=en&country=us</a></p>
    <p>Example with date filtering: <a href="/api/reviews?app_id=org.supertuxkart.stk&from_date=2023-01-01&to_date=2023-12-31">/api/reviews?app_id=org.supertuxkart.stk&from_date=2023-01-01&to_date=2023-12-31</a></p>
    """

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8080)
